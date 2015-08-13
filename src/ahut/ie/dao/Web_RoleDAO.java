package ahut.ie.dao;


import java.util.List;

import ahut.ie.dao.support.Page;
import ahut.ie.model.WebRole;


public interface Web_RoleDAO {
	public void save(WebRole transientInstance) ;
	public void delete(WebRole persistentInstance) ;
	public WebRole merge(WebRole detachedInstance) ;
    public WebRole findByRoleCode(String roleCode);
	public List<?> findByExample(WebRole instance);
	public List<?> findByProperty(String propertyName, Object value) ;
	public void attachDirty(WebRole instance) ;
	public void attachClean(WebRole instance) ;
	public List<?> findAll() ;
/**
 * 
 * @param hql
 * @param values
 * @return
 */
public boolean hqlExcute(String hql, Object... values);

/**
 * 
 * @param hql
 * @param values
 * @return
 */
public List<WebRole> hqlQuery(String hql, Object... values);

/**
 * @param <T>
 * @param hql
 * @param pageNo 页面号
 * @param pageSize 页面容量
 * @param values
 * @return
 */
public  Page<WebRole> pagedQuery(String hql, int pageNo, int pageSize, Object... values);

/**
 * @param <T>
 * @param hql
 * @param startNo 分页从哪一条数据开始
 * @param pageSize 页面容量
 * @param values
 * @return
 */
public  Page<WebRole> pagedQueryByStartNo(String hql, int startNo, int pageSize, Object... values);

/**
 * 根据命名参数查询
 * @param <T>
 * @param hql 带有命名参数的hql语句
 * @param paramNames 命名参数的名字
 * @param values  命名参数的值<br>
 * <b>例如:</b><br>
 * findByNamedParams("from Test where t1 = :t",new String[]{"t"},tValue);
 * @return 
 */
public  List<WebRole> findByNamedParams(String hql,String[] paramNames,Object...values);





}
