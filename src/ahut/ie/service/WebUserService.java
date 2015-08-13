package ahut.ie.service;


import java.util.HashMap;
import java.util.List;

import ahut.ie.dao.support.Page;
import ahut.ie.model.WebUser;

public interface WebUserService {

	/**
	 * 用户登录
	 * @param userName
	 * @param password
	 * @param validCode
	 * @return
	 */
	public HashMap<String, String> login(String userName,String password,String validCode);
	
	/**
	 * 查找用户
	 * @param userName
	 * @return
	 */
	public WebUser findByUserName(String userName);
	
	/**
	 * 增加用户
	 * @param instance
	 * @return
	 */
	public boolean add(WebUser instance);
	
	/**
	 * 删除用户
	 * @param instance
	 * @return
	 */
	public boolean delete(WebUser instance);
	
	/**
	 * 修改用户
	 * @param instance
	 * @return
	 */
	public boolean update(WebUser instance);
	
	/**
	 * 查询用户
	 * @param filters
	 * @param orders
	 * @param values
	 * @return
	 */
	public List<WebUser> Query(String filters, String orders, Object... values);
	
	/**
	 * 分页查询用户
	 * @param startNo
	 * @param pageSize
	 * @param filters
	 * @param orders
	 * @param values
	 * @return
	 */
	public Page<WebUser> pageQuery(int startNo, int pageSize,String filters, String orders, Object... values);
	
	/**
	 * 查询全部用户
	 * @return
	 */
	public List<?> getAll();
}
