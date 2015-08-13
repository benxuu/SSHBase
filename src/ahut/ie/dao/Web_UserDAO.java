package ahut.ie.dao;



import java.util.List;

import ahut.ie.dao.support.Page;
import ahut.ie.model.WebUser;


public interface Web_UserDAO { 
	public void save(WebUser transientInstance) ;
	public void delete(WebUser persistentInstance) ;
	public WebUser merge(WebUser detachedInstance) ;
	public List<?> findByExample(WebUser instance);
	public List<?> findByProperty(String propertyName, Object value) ;
	public WebUser findByUsername(String username);
	public List<?> findByUsercname(String usercname);
	public List<?> findByWebRole(Object webRole);
	public void attachDirty(WebUser instance) ;
	public void attachClean(WebUser instance) ;
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
public List<WebUser> hqlQuery(String hql, Object... values);

/**
 * @param <T>
 * @param hql
 * @param pageNo 页面号
 * @param pageSize 页面容量
 * @param values
 * @return
 */
@SuppressWarnings("hiding")
public <WebUser> Page<WebUser> pagedQuery(String hql, int pageNo, int pageSize, Object... values);

/**
 * @param <T>
 * @param hql
 * @param startNo 分页从哪一条数据开始
 * @param pageSize 页面容量
 * @param values
 * @return
 */
public  Page<WebUser> pagedQueryByStartNo(String hql, int startNo, int pageSize, Object... values);

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
public  List<WebUser> findByNamedParams(String hql,String[] paramNames,Object...values);





}