package ahut.ie.dao.impl;
// default package


import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ahut.ie.dao.Web_UserDAO;
import ahut.ie.dao.support.Page;
import ahut.ie.model.WebUser;

public class Web_UserDAOImpl extends HibernateDaoSupport implements Web_UserDAO  {
	     private static final Logger log = LoggerFactory.getLogger(Web_UserDAOImpl.class);
		//property constants
	public static final String USERNAME = "username";
	public static final String USERCNAME = "usercname";
	public static final String PASSWORD = "password";
	public static final String WEBROLE = "WebRole";



	protected void initDao() {
		//do nothing
	}
    
    public void save(WebUser transientInstance) {
        log.debug("saving Web_User instance");
        try {
            getHibernateTemplate().saveOrUpdate(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(WebUser persistentInstance) {
        log.debug("deleting Web_User instance");
        try {
            getHibernateTemplate().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
    
    public WebUser findById(String id) {
        log.debug("getting Web_User instance with username: " + id);
        try {
            WebUser instance = (WebUser) getHibernateTemplate()
                    .get(WebUser.class, id);
            
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
  
    public WebUser merge(WebUser detachedInstance) {
        log.debug("merging Web_User instance");
        try {
            WebUser result = (WebUser) getHibernateTemplate()
                    .merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }
    
    public List<?> findByExample(WebUser instance) {
        log.debug("finding Web_User instance by example");
        try {
        	List<?> results = getHibernateTemplate().findByExample(instance);
            log.debug("find by example successful, result size: " + results.size());
            return results;
        } catch (RuntimeException re) {
            log.error("find by example failed", re);
            throw re;
        }
    }    
    
    public List<?> findByProperty(String propertyName, Object value) {
      log.debug("finding Web_User instance with property: " + propertyName
            + ", value: " + value);
      try {
         String queryString = "from WebUser as model where model." 
         						+ propertyName + " = ?";
		 return getHibernateTemplate().find(queryString, value);
      } catch (Throwable re) {
         log.error("find by property name failed", re);
         throw new RuntimeException(re);
      }
	}

	public WebUser findByUsername(String username
	) {
		List<?> webUserList= findByProperty("userName", username
		);
		if(webUserList.isEmpty())
		{
			return null;
		}
		else
		{
			return (WebUser)webUserList.get(0);
		}
		
	}
	
	public List<?> findByUsercname(String usercname
	) {
		return findByProperty("userCname", usercname
		);
	}
	

	public List<?> findByWebRole(Object webrole
	) {
		return findByProperty("webRole", webrole
		);
	}
	

	public List<?> findAll() {
		log.debug("finding all Web_User instances");
		try {
			String queryString = "from WebUser";
		 	return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

    public void attachDirty(WebUser instance) {
        log.debug("attaching dirty WebUser instance");
        try {
            getHibernateTemplate().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(WebUser instance) {
        log.debug("attaching clean Web_User instance");
        try {
            getHibernateTemplate().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

	public static Web_UserDAOImpl getFromApplicationContext(ApplicationContext ctx) {
    	return (Web_UserDAOImpl) ctx.getBean("Web_UserDAO");
	}
	/**
	 * @param <T>
	 * @param hql
	 * @param pageNo 页面号
	 * @param pageSize 页面容量
	 * @param values
	 * @return
	 */

	@SuppressWarnings({ "unchecked", "hiding" })
	public <WebUser> Page<WebUser> pagedQuery(String hql, int pageNo, int pageSize, Object... values) {
		// Count查询
		String countQueryString = " select count (*) " + removeSelect(removeOrders(hql));
		List<WebUser> countlist = this.getHibernateTemplate().find(countQueryString, values);
		long totalCount = (Long) countlist.get(0);

		if (totalCount < 1)
			return new Page<WebUser>();
		// 当前页的开始数据索引
		long startIndex = Page.getStartOfPage(pageNo, pageSize);
		Query query = this.createQuery(hql, values);
		List<WebUser> list = query.setFirstResult((int) startIndex).setMaxResults(pageSize).list();

		return new Page<WebUser>(startIndex, totalCount, pageSize, list);
	}
	/**
	 * 创建Query对象.<br>
	 * 对于需要first,max,fetchsize,cache,cacheRegion等诸多设置的函数,可以在返回Query后自行设置.
	 * @param hql
	 * @param values
	 * @return
	 */
	public Query createQuery(String hql,Object... values) {
		//这里的false表示不创建session,保证当前操作在spring同一个事务的管理下
		Query query = this.getSession(false).createQuery(hql);
		if (values != null) {
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
		}
		return query;
	}
	/**
	 * 去除hql的orderby 子句，用于pagedQuery.
	 */
	private static String removeOrders(String hql) {
		Pattern p = Pattern.compile("order\\s*by[\\w|\\W|\\s|\\S]*", Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(hql);
		StringBuffer sb = new StringBuffer();
		while (m.find()) {
			m.appendReplacement(sb, "");
		}
		m.appendTail(sb);
		return sb.toString();
	}
	
	/**
	 * 去除hql的select 子句,未考虑union的情况,用于pagedQuery.
	 */
	private static String removeSelect(String hql) {
		int beginPos = hql.toLowerCase().indexOf("from");
		return hql.substring(beginPos);
	}

	@Override
	public boolean hqlExcute(String hql, Object... values) {
		Query query = this.createQuery(hql, values);
		if(query.executeUpdate()>0)
			return true;
		else
			return false;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<WebUser> hqlQuery(String hql,
			Object... values) {
		Query query = this.createQuery(hql, values);
		List<WebUser> list = query.list();
		return list;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Page<WebUser> pagedQueryByStartNo(String hql,
			int startNo, int pageSize, Object... values) {
		String countQueryString = " select count (*) " + removeSelect(removeOrders(hql));
 		List<Long> countlist = getHibernateTemplate().find(countQueryString, values);
 		long totalCount = (Long) countlist.get(0);

 		if (totalCount < 1)
 			return new Page<WebUser>();
 		 
 		int startIndex = startNo;
 		Query query = createQuery(hql, values);
 		List<WebUser> list = query.setFirstResult(startIndex).setMaxResults(pageSize).list();

 		return new Page<WebUser>(startIndex, totalCount, pageSize, list);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<WebUser> findByNamedParams(String hql,
			String[] paramNames, Object... values) {
		return this.getHibernateTemplate().findByNamedParam(hql, paramNames, values);
	}
	
}