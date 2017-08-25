package ma.net.munisys;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

//@SpringBootApplication
public class ApplicationInitializer extends SpringBootServletInitializer {
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		// TODO Auto-generated method stub
		return builder.sources(ActivitesEmployeesApplication.class);
	}
	
	public static void main(String[] args) throws Exception {
        SpringApplication.run(ActivitesEmployeesApplication.class, args);
    }

}
