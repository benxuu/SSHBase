package ahut.ie.service.impl;


import java.util.List;

import ahut.ie.dao.Web_RoleDAO;
import ahut.ie.dao.support.Page;
import ahut.ie.model.WebRole;
import ahut.ie.service.WebRoleService;

public class WebRoleServiceImpl implements WebRoleService{
	private Web_RoleDAO webRoleDao;


	 public Web_RoleDAO getWebRoleDao() {
			return webRoleDao;
		}

		public void setWebRoleDao(Web_RoleDAO webRoleDao) {
			this.webRoleDao = webRoleDao;
		}

	public WebRole getWebRoleByRoleCode(java.lang.String roleCode) {
		return webRoleDao.findByRoleCode(roleCode);
	}
	
	public boolean addWebRole(WebRole instance) {
		try {
			webRoleDao.save(instance);
		} catch (Exception e) {
			return false;
		}
		return true;
	}
	
	public boolean deleteWebRole(WebRole instance){
		try {
			webRoleDao.delete(instance);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	public boolean updateWebRole(WebRole instance){
		try {
			webRoleDao.merge(instance);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	@Override
	public List<WebRole> Query(String filters, String orders, Object... values) {
		// TODO Auto-generated method stub
          String hql = "from WebRole as model";
		
		if(filters != null && filters !="")
			hql += " where " + filters;
		
		if(orders != null && orders !="")
			hql += " order by " + orders;
		
		return webRoleDao.hqlQuery(hql, values);
	}

	@Override
	public Page<WebRole> pageQuery(int startNo, int pageSize, String filters,
			String orders, Object... values) {
		// TODO Auto-generated method stub
         String hql = "from WebRole as model";
		
		if(filters != null)
			hql += " where " + filters;
		
		if(orders != null)
			hql += " order by " + orders;
	
		return webRoleDao.pagedQueryByStartNo(hql, startNo, pageSize,values);
	}

	@Override
	public List<?> getAll() {
		// TODO Auto-generated method stub
		return this.webRoleDao.findAll();
	}

	
}
