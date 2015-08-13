package ahut.ie.act;


import java.util.List;




import net.sf.json.JSONObject;


import org.apache.struts2.ServletActionContext;

import ahut.ie.dao.support.Page;
import ahut.ie.model.WebRole;
import ahut.ie.model.WebUser;
import ahut.ie.service.WebRoleService;
import ahut.ie.service.WebUserService;
import ahut.ie.util.FilterList;
import ahut.ie.util.JsonResult;
import ahut.ie.util.SpringContextUtil;

import com.opensymphony.xwork2.ActionSupport;

public class UserManagerAction extends ActionSupport {
	private static final long serialVersionUID = 1156321515582340432L;

	private JsonResult result;
	private boolean success;
	private WebUserService webUserService;
	private WebRoleService webRoleService;
	private List<?> datas;
	private String userName;
	private String rolecode;
	public String getUserName(){
	   return this.userName;
	}
	public void setUserName(String userName)
	{
		this.userName=userName;
	}
	public String getRolecode() {
		return rolecode;
	}
	public void setRolecode(String rolecode) {
		this.rolecode = rolecode;
	}
	public JsonResult getResult() {
		return result;
	}

	public void setResult(JsonResult result) {
		this.result = result;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public List<?> getDatas() {
		return datas;
	}

	public void setDatas(List<?> datas) {
		this.datas = datas;
	}

	public WebUserService getWebUserService() {
		this.webUserService= (WebUserService)SpringContextUtil
				.getBean("WebUserServiceImpl");
		return this.webUserService;
	}

	public void setWebUserService(WebUserService webUserServiceImpl) {
		this.webUserService = webUserServiceImpl;
	}
	
	public WebRoleService getWebRoleService() {
		this.webRoleService= (WebRoleService)SpringContextUtil
				.getBean("WebRoleServiceImpl");
		return webRoleService;
	}
	public void setWebRoleService(WebRoleService webRoleService) {
		this.webRoleService = webRoleService;
	}
	public String Page() {
		return "page";
	}
	public String UserList(){
	
		String filter = ServletActionContext.getRequest()
				.getParameter("filter");
		String sort = ServletActionContext.getRequest().getParameter("sort");
		String dir = ServletActionContext.getRequest().getParameter("dir");
		
		String orders = null;

		if (sort != null && dir != null)
			orders = sort + " " + dir;
		int startNo = Integer.parseInt(ServletActionContext.getRequest()
				.getParameter("start"));
		int pageSize = Integer.parseInt(ServletActionContext.getRequest()
				.getParameter("limit"));
		if(filter!=null)
		{
		filter=FilterList.getSqlFilter(filter);
		}
		Page<WebUser> pageList =this.getWebUserService().pageQuery(startNo,
				pageSize, filter, orders);
		setResult(new JsonResult(pageList.getResult(), pageList.getTotalCount()));
		this.setSuccess(true);
		return SUCCESS;
		
	}
	
	@SuppressWarnings("unused")
	public String AddUser()
	{
		JSONObject json = JSONObject.fromObject(datas.get(0)); // 转换为json对象格式
		try {
			
			WebUser webUser = (WebUser) JSONObject.toBean(
					json,WebUser.class);// 将json对象转换为javaBean
			WebRole webRole=this.getWebRoleService().getWebRoleByRoleCode(rolecode);
			webUser.setWebRole(this.getWebRoleService().getWebRoleByRoleCode(rolecode));
			this.getWebUserService().add(webUser);
			this.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			this.setSuccess(false);
		}
		return SUCCESS;
	
	}
	public String DelUser()
	{
		try{
		    WebUser webUser=this.getWebUserService().findByUserName(userName);
		    this.getWebUserService().delete(webUser);
		    this.setSuccess(true);
	    } catch(Exception e){
		
	    	e.printStackTrace();
	    	this.setSuccess(false);
	    }
		return SUCCESS;
	}
	public String UpdataUser(){
		JSONObject json = JSONObject.fromObject(datas.get(0)); // 转换为json对象格式
		try {
			
			WebUser webUser = (WebUser) JSONObject.toBean(
					json,WebUser.class);// 将json对象转换为javaBean
			this.getWebUserService().update(webUser);
			this.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			this.setSuccess(false);
		}
		return SUCCESS;
	
	}
   public WebUser GetUserInfo(){
	   return this.getWebUserService().findByUserName(userName);
	    
   }
   }

