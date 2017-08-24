package ma.net.munisys.security;


import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
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
	 /*  auth.jdbcAuthentication()
	     .dataSource(dataSource)
	     .usersByUsernameQuery("select username as principal,password as credentials,active from users where username=?")
	     .authoritiesByUsernameQuery("select user_username as principal, roles_role as role from users_role where user_username=?")
	     .rolePrefix("ROLE_");
	     //.passwordEncoder();*/
	   
	   auth
       .ldapAuthentication().contextSource()
       .url("ldap://130.24.31.215:3268/DC=MUNISYS,DC=INTRANET")
       .managerDn("CN=stage01,ou=Munisys-Casa,DC=MUNISYS,DC=INTRANET")
       .managerPassword("123456") 
       
       .and().userSearchFilter("(mail={0})")
       .userSearchBase("");
}
   
   @Override
	protected void configure(HttpSecurity http) throws Exception {
		http.formLogin().loginPage("/login").permitAll().defaultSuccessUrl("/protected/index.html");
		http.csrf().disable();
		//http.authorizeRequests().antMatchers("/**").permitAll(); 
		//http.authorizeRequests().anyRequest().permitAll();
		http.authorizeRequests().antMatchers("/production/**","/production/css/**","/production/images/**","/vendors/**","/vendors/bootstrap/dist/css/**","/build/**","/build/css/**").permitAll().anyRequest().authenticated();
		http.authorizeRequests().antMatchers("/protected/*").hasRole("employer");
		http.exceptionHandling().accessDeniedPage("/403");
		http.logout().permitAll();
	   
		
	}
}
