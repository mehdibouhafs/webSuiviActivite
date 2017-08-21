package ma.net.munisys.entities;

import java.io.Serializable;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class DureeMonth implements Serializable {
	
	private String month;
	private double taux;
	private double nbhoursMonth;
	
	
	public DureeMonth() {
		// TODO Auto-generated constructor stub
	}


	public String getMonth() {
		return month;
	}


	public void setMonth(String month) {
		this.month = month;
	}


	


	public double getTaux() {
		return taux;
	}


	public void setTaux(double taux) {
		this.taux = taux;
	}


	public double getNbhoursMonth() {
		return nbhoursMonth;
	}


	public void setNbhoursMonth(double nbhoursMonth) {
		this.nbhoursMonth = nbhoursMonth;
	}


	public static String sumDuree(List<String> allDuree,String month){
			 
		    long tm = 0;
		    for (String tmp : allDuree){
		    	
		        String[] arr = tmp.split(":");
		        tm += Integer.parseInt(arr[2]);
		        tm += 60 * Integer.parseInt(arr[1]);
		        tm += 3600 * Integer.parseInt(arr[0]);
		    }
		
		    long hh = tm / 3600;
		    tm %= 3600;
		    long mm = tm / 60;
		    tm %= 60;
		    long ss = tm;
		    System.out.println("Sum Duree "+ month+" " + format(hh) + ":" + format(mm) + ":" + format(ss));
		    return format(hh) + ":" + format(mm) + ":" + format(ss);
		    
		   
	}
	
	 private static String format(long s){
	        if (s < 10) return "0" + s;
	        else return "" + s;
	  }
	 
	 
	 public static double calculeTaux(String totaleDuree,Date start, Date end,String totalConge,int nbDateExcluded){
			
		 
		 double heureBrute,minuteBrute = 0;
			 String[] totaleDurees = totaleDuree.split(":");
	        double heureTotaleDuree = Double.parseDouble(totaleDurees[0]);
	        double minuteTotaleDuree = Double.parseDouble(totaleDurees[1]);
	        
	       //System.out.println("Duree Totale de travail " + totaleDuree);
	        
	        String[] totaleConges = totalConge.split(":");
	        double heureTojourConge = Double.parseDouble(totaleConges[0]) / 24;
	        double minuteTojourConge = (Double.parseDouble(totaleConges[1])/60) /24;
	        double nbHoliday;double totaleHourConge;
	        if(heureTojourConge>0 && heureTojourConge<1){
	        	if( Integer.parseInt(totaleConges[0])>=8){
	        		nbHoliday = 1;
	        		totaleHourConge = nbHoliday * 8;
	        	}else{
	        		nbHoliday = Double.parseDouble(totaleConges[0]) +(Double.parseDouble(totaleConges[1])/60);
	        		System.out.println("NB HOLI LI " + nbHoliday);
	        		totaleHourConge = nbHoliday;
	        	}
	        }else{
	        	nbHoliday = heureTojourConge + minuteTojourConge;
	        	totaleHourConge = nbHoliday * 8;
	        }
	        
	    
	        //System.out.println("Jour de vacance "+nbHoliday);
	        int nbWorkingDay = getWorkingDaysBetweenTwoDates(start, end,nbDateExcluded);
	        //System.out.println("jour ouvrable " + nbWorkingDay);
	        
	       
	          
	        
	        //System.out.println("Totale Hour Cnge " + totaleHourConge);
	        double nbMinute = totaleHourConge-Math.floor(totaleHourConge);
	        //System.out.println("NB minute " + nbMinute);
	        double nbHoureConge =  totaleHourConge - nbMinute; // heure conge
	        double nbMinuteConge = nbMinute * 60;
	        
	        //System.out.println("Nombre heure conge :" + nbHoureConge + " Heures");
	        //System.out.println("Nombre Minute conge :" + nbMinuteConge  + " min");
	        
	        
	        
	        String tempsMax = (nbWorkingDay-nbHoliday) * 8+":00:00";
	        
	        String[] tempMAx = tempsMax.split(":");
	        double heureMax = Double.parseDouble(tempMAx[0]);
	        double minuteMax = Double.parseDouble(tempMAx[1]);
	        
	       // System.out.println("Temp 8h pour les " + nbWorkingDay + "jours  = "+tempsMax);
	        
	        if(heureTotaleDuree > nbHoureConge){
	        	//System.out.println("her");
		         heureBrute = heureTotaleDuree - nbHoureConge;
		         minuteBrute = minuteTotaleDuree-nbMinuteConge;
	        }else{
	        	heureBrute = heureTotaleDuree;
	        	 minuteBrute = minuteTotaleDuree;
	        }
	        
	        if(minuteBrute<0){
	        	minuteBrute *=-1;
	        }
	        
	        double calcHeure,calcMinute =0;
	        
	        if(heureMax >= heureBrute){
	        	 calcHeure = heureBrute/heureMax;
	        	 calcMinute = minuteBrute/60/heureMax;
	        }else{
	        	calcHeure = (heureBrute - heureMax) + heureMax;
	        	calcMinute = minuteMax - minuteBrute;
	        }
	        
	        if(calcMinute<0){
	        	calcMinute *=-1;
	        }
	        
	        double taux= calcHeure + calcMinute;
	        
	        
	        
	        //System.out.println("Heure Brute "  +heureBrute + " heure et minuteBrute "+ minuteBrute);
	        
	       // System.out.println("Heure Calcule "  +calcHeure + " heure et minuteCalcule "+ calcMinute);
	        
	       // System.out.println("Taux " + taux * 100);
	        
	        //double v =  (v1-totale) * 8; // day  jour work - conge  * 8h        
	        return taux * 100;
	    
	        
		 }
	 
	 
	 public static double calculeDureeHoursMonth(String totaleDuree,Date start, Date end,String totalConge,int nbDateExcluded){
			double heureBrute,minuteBrute = 0;
			 String[] totaleDurees = totaleDuree.split(":");
	        double heureTotaleDuree = Double.parseDouble(totaleDurees[0]);
	        double minuteTotaleDuree = Double.parseDouble(totaleDurees[1]);
	        
	       //System.out.println("Duree Totale de travail " + totaleDuree);
	        
	        String[] totaleConges = totalConge.split(":");
	        double heureTojourConge = Double.parseDouble(totaleConges[0]) / 24;
	        double minuteTojourConge = (Double.parseDouble(totaleConges[1])/60) /24;
	        double nbHoliday;double totaleHourConge;
	        if(heureTojourConge>0 && heureTojourConge<1){
	        	if( Integer.parseInt(totaleConges[0])>=8){
	        		nbHoliday = 1;
	        		totaleHourConge = nbHoliday * 8;
	        	}else{
	        		nbHoliday = Double.parseDouble(totaleConges[0]) +(Double.parseDouble(totaleConges[1])/60);
	        		//System.out.println("NB HOLI LI " + nbHoliday);
	        		totaleHourConge = nbHoliday;
	        	}
	        }else{
	        	nbHoliday = heureTojourConge + minuteTojourConge;
	        	totaleHourConge = nbHoliday * 8;
	        }
	        
	    
	        //System.out.println("Jour de vacance "+nbHoliday);
	        int nbWorkingDay = getWorkingDaysBetweenTwoDates(start, end,nbDateExcluded);
	       // System.out.println("jour ouvrable " + nbWorkingDay);
	        
	       
	          
	        
	       // System.out.println("Totale Hour Cnge " + totaleHourConge);
	        double nbMinute = totaleHourConge-Math.floor(totaleHourConge);
	       // System.out.println("NB minute " + nbMinute);
	        double nbHoureConge =  totaleHourConge - nbMinute; // heure conge
	        double nbMinuteConge = nbMinute * 60;
	        
	       // System.out.println("Nombre heure conge :" + nbHoureConge + " Heures");
	       // System.out.println("Nombre Minute conge :" + nbMinuteConge  + " min");
	        
	        
	        
	        String tempsMax = (nbWorkingDay-nbHoliday) * 8+":00:00";
	        
	        String[] tempMAx = tempsMax.split(":");
	        double heureMax = Double.parseDouble(tempMAx[0]);
	        double minuteMax = Double.parseDouble(tempMAx[1]);
	        
	        //System.out.println("Temp 8h pour les " + nbWorkingDay + "jours  = "+tempsMax);
	        
	        if(heureTotaleDuree > nbHoureConge){
	        	//System.out.println("her");
		         heureBrute = heureTotaleDuree - nbHoureConge;
		         minuteBrute = minuteTotaleDuree-nbMinuteConge;
	        }else{
	        	heureBrute = heureTotaleDuree;
	        	 minuteBrute = minuteTotaleDuree;
	        }
	        
	        if(minuteBrute<0){
	        	minuteBrute *=-1;
	        }
	        
	        
	        double taux= heureBrute + (minuteBrute / 60);
	        
	        
	        
	        //System.out.println("Heure Brute "  +heureBrute + " heure et minuteBrute "+ minuteBrute);
	        
	       
	        
	        System.out.println("Taux calculeDureeHoursMonth " + taux );
	        double res = taux / 24;
	        System.out.println(" RES calculeDureeHoursMonth " + res);
	       
	        String result = new DecimalFormat("##.##").format(res);
	        System.out.println(" new Result " + result);
	        //double v =  (v1-totale) * 8; // day  jour work - conge  * 8h     
	        NumberFormat format = NumberFormat.getInstance(Locale.FRANCE);
	        try {
				Number number = format.parse(result);
				return number.doubleValue();
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        return 0;
	        
		 }
	 
	 public static double calculeTempsMaxMonth(String totaleDuree,Date start, Date end,String totalConge,int nbDateExcluded){
			double heureBrute,minuteBrute = 0;
			 String[] totaleDurees = totaleDuree.split(":");
	        double heureTotaleDuree = Double.parseDouble(totaleDurees[0]);
	        double minuteTotaleDuree = Double.parseDouble(totaleDurees[1]);
	        
	       
	        
	        String[] totaleConges = totalConge.split(":");
	        double heureTojourConge = Double.parseDouble(totaleConges[0]) / 24;
	        double minuteTojourConge = (Double.parseDouble(totaleConges[1])/60) /24;
	        double nbHoliday;double totaleHourConge;
	        if(heureTojourConge>0 && heureTojourConge<1){
	        	if( Integer.parseInt(totaleConges[0])>=8){
	        		nbHoliday = 1;
	        		totaleHourConge = nbHoliday * 8;
	        	}else{
	        		nbHoliday = Double.parseDouble(totaleConges[0]) +(Double.parseDouble(totaleConges[1])/60);
	        		
	        		totaleHourConge = nbHoliday;
	        	}
	        }else{
	        	nbHoliday = heureTojourConge + minuteTojourConge;
	        	totaleHourConge = nbHoliday * 8;
	        }
	        
	    
	      
	        int nbWorkingDay = getWorkingDaysBetweenTwoDates(start, end,nbDateExcluded);
	      
	        double nbMinute = totaleHourConge-Math.floor(totaleHourConge);
	        
	        double nbHoureConge =  totaleHourConge - nbMinute; // heure conge
	        double nbMinuteConge = nbMinute * 60;
	       
	        
	        
	        Double tempsMax = (nbWorkingDay-nbHoliday) ;
	        
	        //System.out.println("Temp 8h pour les " + nbWorkingDay + "jours  = "+tempsMax);
	        
	               
	        return tempsMax;
	        
		 }
     
         
	 
	
	public static int getWorkingDaysBetweenTwoDates(Date startDate, Date endDate,int nbDateExcluded) {  
		
		List<Integer> holidays = Arrays.asList(1,11,121,211,226,232,233,310,322);
		//holidays.add(1);holidays.add(11);holidays.add(121);holidays.add(211);holidays.add(226);holidays.add(232);
		//holidays.add(233);holidays.add(310);holidays.add(322);
		
	    Calendar startCal;  
	    Calendar endCal;  
	    startCal = Calendar.getInstance();  
	    startCal.setTime(startDate);  
	    endCal = Calendar.getInstance();  
	    endCal.setTime(endDate);  
	    int workDays = 0;  

	    //Return 0 if start and end are the same  
	    if (startCal.getTimeInMillis() == endCal.getTimeInMillis()) {  
	        return 0;  
	    }  

	    if (startCal.getTimeInMillis() > endCal.getTimeInMillis()) {  
	        startCal.setTime(endDate);  
	        endCal.setTime(startDate);  
	    }  

	    do {  
	        startCal.add(Calendar.DAY_OF_MONTH, 1);  
	        if (startCal.get(Calendar.DAY_OF_WEEK) != Calendar.SATURDAY   
	       && startCal.get(Calendar.DAY_OF_WEEK) != Calendar.SUNDAY
	       && !holidays.contains((Integer) startCal.get(Calendar.DAY_OF_YEAR))
	        		) {  
	            ++workDays;  
	        }  
	    } while (startCal.getTimeInMillis() < endCal.getTimeInMillis());  

	   // System.out.println("Working DAY " + workDays);
	    return workDays-nbDateExcluded;  
	}
	 
	 
	 /*
	 
	 public static long daysWithoutWeek(Date start, Date end){ //start one day before
		    //Ignore argument check

		    Calendar c1 = Calendar.getInstance();
		    c1.setTime(start);
		    int w1 = c1.get(Calendar.DAY_OF_WEEK);
		    c1.add(Calendar.DAY_OF_WEEK, -w1);

		    Calendar c2 = Calendar.getInstance();
		    c2.setTime(end);
		    int w2 = c2.get(Calendar.DAY_OF_WEEK);
		    c2.add(Calendar.DAY_OF_WEEK, -w2);

		    //end Saturday to start Saturday 
		    long days = (c2.getTimeInMillis()-c1.getTimeInMillis())/(1000*60*60*24);
		    long daysWithoutWeekendDays = days-(days*2/7);

		    // Adjust days to add on (w2) and days to subtract (w1) so that Saturday
		    // and Sunday are not included
		    if (w1 == Calendar.SUNDAY && w2 != Calendar.SATURDAY) {
		        w1 = Calendar.MONDAY;
		    } else if (w1 == Calendar.SATURDAY && w2 != Calendar.SUNDAY) {
		        w1 = Calendar.FRIDAY;
		    } 

		    if (w2 == Calendar.SUNDAY) {
		        w2 = Calendar.MONDAY;
		    } else if (w2 == Calendar.SATURDAY) {
		        w2 = Calendar.FRIDAY;
		    }

		    return daysWithoutWeekendDays-w1+w2;
		}*/
	 

}
