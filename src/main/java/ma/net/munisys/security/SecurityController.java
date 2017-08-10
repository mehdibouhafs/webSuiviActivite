package ma.net.munisys.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SecurityController {
	
	
	
	
	@RequestMapping("/login")
	  public String login(){
		  return "login";
	  }
	
	@RequestMapping(value="/logout", method = RequestMethod.GET)
	public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
	    org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    if (auth != null){    
	        new SecurityContextLogoutHandler().logout(request, response, auth);
	    }
	    return "403";//You can redirect wherever you want, but generally it's a good practice to show login screen again.
	}
	
	
	
	@RequestMapping("/")
	public String index2(){
		return "redirect:/index.html";
	}
	
	@RequestMapping("/index")
	public String index3(){
		return "redirect:/protected/index.html";
	}
	
	@RequestMapping("/mesinterventions")
	public String index4(){
		return "redirect:/protected/index.html";
	}
	
	@RequestMapping("/allinterventions")
	public String index5(){
		return "redirect:/protected/index.html";
	}
	
	@RequestMapping("/help")
	public String index6(){
		return "redirect:/protected/index.html";
	}
	
	@RequestMapping("/moncalendrier")
	public String index7(){
		return "redirect:/protected/index.html";
	}
	
	@RequestMapping("/adminCalendar")
	public String index10(){
		return "redirect:/protected/index.html";
	}
	
	@RequestMapping("/profile")
	public String index11(){
		return "redirect:/protected/index.html";
	}
	
	
	@RequestMapping("/nouvelleIntervention")
	public String index8(){
		return "redirect:/protected/index.html";
	}
	
	@RequestMapping("/403")
	public String error403(){
		return "redirect:/protected/index.html";
	}
	
	@RequestMapping("/404")
	public String error404(){
		return "redirect:/protected/index.html";
	}
	
	@RequestMapping("/500")
	public String error500(){
		return "redirect:/protected/index.html";
	}
}