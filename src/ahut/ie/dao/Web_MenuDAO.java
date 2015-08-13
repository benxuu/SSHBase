package ahut.ie.dao;

import java.util.List;

import ahut.ie.model.WebMenu;

public interface Web_MenuDAO {
    public void save(WebMenu transientInstance);
	public void delete(WebMenu persistentInstance);
    public WebMenu findById( java.lang.Integer id) ;
    public List<?> findByExample(WebMenu instance) ;
    public List<?> findByProperty(String propertyName, Object value);
	public List<?> findByOrderid(Object orderid);
	public List<?> findByParentid(Object parentid);
	public List<?> findByText(Object text);
	public List<?> findByQtip(Object qtip);
	public List<?> findByUrl(Object url);
	public List<?> findByParameters(Object parameters);
	public List<?> findByIconcls(Object iconcls) ;
	public List<?> findByLeaf(Object leaf);
	public List<?> findByShowflag(Object showflag);
	public List<?> findAll();
    public WebMenu merge(WebMenu detachedInstance);
    public void attachDirty(WebMenu instance);
    public void attachClean(WebMenu instance) ;

}
