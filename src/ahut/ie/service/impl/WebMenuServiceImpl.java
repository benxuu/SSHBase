package ahut.ie.service.impl;


import java.util.List;

import ahut.ie.dao.Web_MenuDAO;
import ahut.ie.model.WebMenu;
import ahut.ie.service.WebMenuService;

public class WebMenuServiceImpl implements WebMenuService{
   private Web_MenuDAO webMenuDao;
   public Web_MenuDAO getWebMenuDao() {
		return webMenuDao;
	}

	public void setWebMenuDao(Web_MenuDAO webMenuDao) {
		this.webMenuDao = webMenuDao;
	}
	public boolean addWebMenu(WebMenu instance) {
		try {
			webMenuDao.save(instance);
		} catch (Exception e) {
			return false;
		}
		return true;
	}
	
	public boolean deleteWebMenu(WebMenu instance){
		try {
			webMenuDao.delete(instance);
		} catch (Exception e) {
			return false;
		}
		return true;
	}
	
	public boolean updateWebMenu(WebMenu instance){
		try {
			webMenuDao.merge(instance);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	public List<?> getWebMenusByParentId(java.lang.Integer parentId){
		
		return webMenuDao.findByParentid(parentId);
	}

	@Override
	public WebMenu getWebMenuByMenuId(Integer menuId) {
		return webMenuDao.findById(menuId);
	}
}
