package ma.net.munisys.security;


import javax.sql.DataSource;

import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled=true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private DataSource dataSource;
	
	
	
	
	
   @Override
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	/*
	   auth.inMemoryAuthentication()
	  .withUser("hassan").password("123").roles("USER","ADMIN");
	auth.inMemoryAuthentication()
	  .withUser("hasna").password("123").roles("USER");
	  */
	   auth.jdbcAuthentication()
	     .dataSource(dataSource)
	     .usersByUsernameQuery("select username as principal,password as credentials,active from users where username=?")
	     .authoritiesByUsernameQuery("select user_username as principal, roles_role as role from users_role where user_username=?")
	     .rolePrefix("ROLE_");
	     //.passwordEncoder();
	   
	  /* auth
       .ldapAuthentication().contextSource()
       .url("ldap://xxxxxxxx/xxxx)
       .managerDn("xxxxxxx)
       .managerPassword("xxxx") 
       
       .and().userSearchFilter("(mailNickname={0})")
       .userSearchBase("");*/
}
   
   @Override
	protected void configure(HttpSecurity http) throws Exception {
		http.formLogin().loginPage("/login").permitAll().defaultSuccessUrl("/protected/index.html");//.failureHandler(new SimpleUrlAuthenticationFailureHandler()).successHandler(new NoRedirectSavedRequestAwareAuthenticationSuccessHandler())
		http.csrf().disable();
		//http.authorizeRequests().antMatchers("/**").permitAll(); 
		//http.authorizeRequests().anyRequest().permitAll();
		http.authorizeRequests().antMatchers("/production/**","/production/css/**","/production/images/**","/vendors/**","/vendors/bootstrap/dist/css/**","/build/**","/build/css/**").permitAll().anyRequest().authenticated();
		http.authorizeRequests().antMatchers("/protected/*").hasRole("employer");
		http.exceptionHandling().accessDeniedPage("/403");
		http.logout().permitAll();
	   
		
	}
   
   
   
}
