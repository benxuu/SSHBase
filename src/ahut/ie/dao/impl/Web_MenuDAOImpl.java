package ahut.ie.dao.impl;
// default package


import java.util.List;
import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ahut.ie.dao.Web_MenuDAO;
import ahut.ie.model.WebMenu;

public class Web_MenuDAOImpl extends HibernateDaoSupport implements Web_MenuDAO  {
	     private static final Logger log = LoggerFactory.getLogger(Web_MenuDAOImpl.class);
		//property constants
	public static final String ORDERID = "orderid";
	public static final String PARENTID = "parentid";
	public static final String TEXT = "text";
	public static final String QTIP = "qtip";
	public static final String URL = "url";
	public static final String PARAMETERS = "parameters";
	public static final String ICONCLS = "iconcls";
	public static final String LEAF = "leaf";
	public static final String SHOWFLAG = "showflag";



	protected void initDao() {
		//do nothing
	}
    
    public void save(WebMenu transientInstance) {
        log.debug("saving Web_Menu instance");
        try {
            getHibernateTemplate().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(WebMenu persistentInstance) {
        log.debug("deleting Web_Menu instance");
        try {
            getHibernateTemplate().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
    
    public WebMenu findById( java.lang.Integer id) {
        log.debug("getting Web_Menu instance with id: " + id);
        try {
            WebMenu instance = (WebMenu) getHibernateTemplate()
                    .get(WebMenu.class, id);
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
    
    
    public List<?> findByExample(WebMenu instance) {
        log.debug("finding Web_Menu instance by example");
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
      log.debug("finding Web_Menu instance with property: " + propertyName
            + ", value: " + value);
      try {
         String queryString = "from WebMenu as model where model." 
         						+ propertyName + "= ?";
		 return getHibernateTemplate().find(queryString, value);
      } catch (RuntimeException re) {
         log.error("find by property name failed", re);
         throw re;
      }
	}

	public List<?> findByOrderid(Object orderid
	) {
		return findByProperty(ORDERID, orderid
		);
	}
	
	public List<?> findByParentid(Object parentid
	) {
		return findByProperty(PARENTID, parentid
		);
	}
	
	public List<?> findByText(Object text
	) {
		return findByProperty(TEXT, text
		);
	}
	
	public List<?> findByQtip(Object qtip
	) {
		return findByProperty(QTIP, qtip
		);
	}
	
	public List<?> findByUrl(Object url
	) {
		return findByProperty(URL, url
		);
	}
	
	public List<?> findByParameters(Object parameters
	) {
		return findByProperty(PARAMETERS, parameters
		);
	}
	
	public List<?> findByIconcls(Object iconcls
	) {
		return findByProperty(ICONCLS, iconcls
		);
	}
	
	public List<?> findByLeaf(Object leaf
	) {
		return findByProperty(LEAF, leaf
		);
	}
	
	public List<?> findByShowflag(Object showflag
	) {
		return findByProperty(SHOWFLAG, showflag
		);
	}
	

	public List<?> findAll() {
		log.debug("finding all Web_Menu instances");
		try {
			String queryString = "from Web_Menu";
		 	return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
    public WebMenu merge(WebMenu detachedInstance) {
        log.debug("merging Web_Menu instance");
        try {
            WebMenu result = (WebMenu) getHibernateTemplate()
                    .merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(WebMenu instance) {
        log.debug("attaching dirty Web_Menu instance");
        try {
            getHibernateTemplate().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(WebMenu instance) {
        log.debug("attaching clean Web_Menu instance");
        try {
            getHibernateTemplate().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

/*	public static Web_MenuDAOImpl getFromApplicationContext(ApplicationContext ctx) {
    	return (Web_MenuDAOImpl) ctx.getBean("Web_MenuDAO");
	}*/
}