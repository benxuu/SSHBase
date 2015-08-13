package ahut.ie.service;


import java.util.List;

import ahut.ie.dao.support.Page;
import ahut.ie.model.WebRole;





public interface WebRoleService {
	/**
	 * 
	 * @param roleCode
	 * @return
	 */
	public WebRole getWebRoleByRoleCode(java.lang.String roleCode);
	
	/**
	 * 
	 * @param instance
	 * @return
	 */
	public boolean addWebRole(WebRole instance);
	
	/**
	 * 
	 * @param instance
	 * @return
	 */
	public boolean deleteWebRole(WebRole instance);

	/**
	 * 
	 * @param instance
	 * @return
	 */
	public boolean updateWebRole(WebRole instance);
	/**
	 * 查询角色
	 * @param filters
	 * @param orders
	 * @param values
	 * @return
	 */
	public List<WebRole> Query(String filters, String orders, Object... values);
	
	/**
	 * 分页查询角色
	 * @param startNo
	 * @param pageSize
	 * @param filters
	 * @param orders
	 * @param values
	 * @return
	 */
	public Page<WebRole> pageQuery(int startNo, int pageSize,String filters, String orders, Object... values);
	
	/**
	 * 查询全部角色
	 * @return
	 */
	public List<?> getAll();
}
