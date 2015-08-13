package ahut.ie.service.impl;




import java.util.HashMap;
import java.util.List;

import ahut.ie.dao.Web_UserDAO;
import ahut.ie.dao.support.Page;
import ahut.ie.model.WebUser;
import ahut.ie.service.WebUserService;

import com.opensymphony.xwork2.ActionContext;

public class WebUserServiceImpl implements WebUserService{
	private Web_UserDAO webUserDao;
	
	public Web_UserDAO getWebUserDao() {
		return webUserDao;
	}

	public void setWebUserDao(Web_UserDAO webUserDao) {
		this.webUserDao = webUserDao;
	}


	public HashMap<String, String> login(String userName,String password,String validCode) {
		HashMap<String, String> result = new HashMap<String, String>();
		
		String sysValidCode = (String)ActionContext.getContext().getSession().get("rand");
		if(!sysValidCode.equals(validCode)){
			result.put("failure", "failure");
			result.put("msg", "验证码错误！");
			return result;
		}
		
		WebUser webUser = null;
		try {
			webUser = this.findByUserName(userName);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if(webUser == null || !webUser.getPassword().equals(password)){
			result.put("failure", "failure");
			result.put("msg", "用户名或密码错误！");
			return result;
		}
		else{
			ActionContext.getContext().getSession().put("webUser", webUser);
			ActionContext.getContext().getSession().put("userName",webUser.getUserName());
			ActionContext.getContext().getSession().put("userCname",webUser.getUserCname());
			result.put("success", "success");
			return result;
		}
	}
	
	

	
	public List<WebUser> findByNamedParams(String hql, String[] paramNames,Object... values){
		return webUserDao.findByNamedParams(hql, paramNames, values);
	}
	
	public boolean add(WebUser instance) {
		try {
			webUserDao.save(instance);
		} catch (Exception e) {
			return false;
		}
		return true;
	}
	
	public boolean delete(WebUser instance){
		try {
			webUserDao.delete(instance);
		} catch (Exception e) {
			return false;
		}
		return true;
	}
	
	public boolean update(WebUser instance){
		try {
			webUserDao.merge(instance);
		} catch (Exception e) {
			return false;
		}
		return true;
	}	
	
	public List<WebUser> Query(String filters, String orders, Object... values){
		String hql = "from WebUser as model";
		
		if(filters != null && filters !="")
			hql += " where " + filters;
		
		if(orders != null && orders !="")
			hql += " order by " + orders;
		
		return webUserDao.hqlQuery(hql, values);
	}
	
	public Page<WebUser> pageQuery(int startNo, int pageSize,String filters, String orders, Object... values){
		String hql = "from WebUser as model";
		
		if((filters != null)&&(!filters.isEmpty()))
			hql += " where " + filters;
		
		if((orders != null)&&(orders!=""))
			hql += " order by " + orders;
	
		return webUserDao.pagedQueryByStartNo(hql, startNo, pageSize,values);
	}
	
	public List<?> getAll(){
		return webUserDao.findAll();
	}

	@Override
	public WebUser findByUserName(String userName) {
		return webUserDao.findByUsername(userName);
	}
}
