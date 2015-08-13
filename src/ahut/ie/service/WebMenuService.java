package ahut.ie.service;


import java.util.List;

import ahut.ie.model.WebMenu;

public interface WebMenuService {
	/**
	 * 
	 * @param menuId
	 * @return
	 */
	public WebMenu getWebMenuByMenuId(java.lang.Integer menuId);
	
	/**
	 * 
	 * @param instance
	 * @return
	 */
	public boolean addWebMenu(WebMenu instance);
	
	/**
	 * 
	 * @param instance
	 * @return
	 */
	public boolean deleteWebMenu(WebMenu instance);
	
	/**
	 * 
	 * @param instance
	 * @return
	 */
	public boolean updateWebMenu(WebMenu instance);

	/**
	 * 
	 * @param parentId
	 * @return
	 */
	public List<?> getWebMenusByParentId(java.lang.Integer parentId);
}
