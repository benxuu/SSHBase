package ahut.ie.dao.impl;
// default package


import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ahut.ie.dao.Web_RoleDAO;
import ahut.ie.dao.support.Page;
import ahut.ie.model.WebRole;


/**
 	* A data access object (DAO) providing persistence and search support for Web_Role entities.
 			* Transaction control of the save(), update() and delete() operations 
		can directly support Spring container-managed transactions or they can be augmented	to handle user-managed Spring transactions. 
		Each of these methods provides additional information for how to configure it for the desired type of transaction control. 	
	 * @see .Web_Role
  * @author MyEclipse Persistence Tools 
 */

public class Web_RoleDAOImpl extends HibernateDaoSupport implements Web_RoleDAO {
	     private static final Logger log = LoggerFactory.getLogger(Web_RoleDAOImpl.class);
		//property constants
	public static final String ROLENAME = "rolename";
	public static final String MEMO = "memo";



	protected void initDao() {
		//do nothing
	}
    
    public void save(WebRole transientInstance) {
        log.debug("saving Web_Role instance");
        try {
            getHibernateTemplate().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(WebRole persistentInstance) {
        log.debug("deleting Web_Role instance");
        try {
            getHibernateTemplate().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
    
    public WebRole findByRoleCode( String RoleCode) {
        log.debug("getting Web_Role instance with RoleCode: " + RoleCode);
        try {
            WebRole instance = (WebRole) getHibernateTemplate()
                    .get(WebRole.class, RoleCode);
            
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
    
    
    public List<?> findByExample(WebRole instance) {
        log.debug("finding Web_Role instance by example");
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
      log.debug("finding Web_Role instance with property: " + propertyName
            + ", value: " + value);
      try {
         String queryString = "from WebRole as model where model." 
         						+ propertyName + "= ?";
		 return getHibernateTemplate().find(queryString, value);
      } catch (RuntimeException re) {
         log.error("find by property name failed", re);
         throw re;
      }
	}

	public List<?> findByRolename(Object rolename
	) {
		return findByProperty(ROLENAME, rolename
		);
	}


	public List<?> findAll() {
		log.debug("finding all Web_Role instances");
		try {
			String queryString = "from WebRole";
		 	return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
    public WebRole merge(WebRole detachedInstance) {
        log.debug("merging Web_Role instance");
        try {
            WebRole result = (WebRole) getHibernateTemplate()
                    .merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(WebRole instance) {
        log.debug("attaching dirty Web_Role instance");
        try {
            getHibernateTemplate().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(WebRole instance) {
        log.debug("attaching clean Web_Role instance");
        try {
            getHibernateTemplate().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
/*
	public static Web_RoleDAOImpl getFromApplicationContext(ApplicationContext ctx) {
    	return (Web_RoleDAOImpl) ctx.getBean("Web_RoleDAO");
	}
*/
	
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
	public List<WebRole> hqlQuery(String hql, Object... values) {
		Query query = this.createQuery(hql, values);
		List<WebRole> list = query.list();
		return list;
	}

	@SuppressWarnings("unchecked")
	@Override
	public  Page<WebRole> pagedQuery(String hql, int pageNo,
			int pageSize, Object... values) {
		// Count查询
		String countQueryString = " select count (*) " + removeSelect(removeOrders(hql));
		List<?> countlist = this.getHibernateTemplate().find(countQueryString, values);
		long totalCount = (Long) countlist.get(0);


		if (totalCount < 1)
			return new Page<WebRole>();
		// 当前页的开始数据索引
		long startIndex = Page.getStartOfPage(pageNo, pageSize);
		Query query = this.createQuery(hql, values);
		List<WebRole> list = query.setFirstResult((int) startIndex).setMaxResults(pageSize).list();

		return new Page<WebRole>(startIndex, totalCount, pageSize, list);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Page<WebRole> pagedQueryByStartNo(String hql, int startNo,
			int pageSize, Object... values) {
	
			String countQueryString = " select count (*) " + removeSelect(removeOrders(hql));
	 		List<Long> countlist = getHibernateTemplate().find(countQueryString, values);
	 		long totalCount = (Long) countlist.get(0);

	 		if (totalCount < 1)
	 			return new Page<WebRole>();
	 		 
	 		int startIndex = startNo;
	 		Query query = createQuery(hql, values);
	 		List<WebRole> list = query.setFirstResult(startIndex).setMaxResults(pageSize).list();

	 		return new Page<WebRole>(startIndex, totalCount, pageSize, list);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<WebRole> findByNamedParams(String hql, String[] paramNames,
			Object... values) {
		return this.getHibernateTemplate().findByNamedParam(hql, paramNames, values);
	}
}