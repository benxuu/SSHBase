package ahut.ie.act;

import ahut.ie.model.WebMenu;
import ahut.ie.model.WebRole;
import ahut.ie.model.WebUser;
import ahut.ie.service.WebUserService;
import ahut.ie.util.Filter;
import ahut.ie.util.FilterList;
import ahut.ie.util.JsonResult;
import ahut.ie.util.SpringContextUtil;

import com.opensymphony.xwork2.ActionSupport;


import java.util.List;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import com.opensymphony.xwork2.ActionContext;

public class LoginAction extends ActionSupport {
	private static final long serialVersionUID = -6921318706754578655L;
	private String actionName;
	private List<?> datas;
	private boolean success;
	private String msg;
	private JsonResult result;
	private WebUserService webUserService;
	
	public LoginAction(){
		this.setWebUserService((WebUserService) SpringContextUtil
				.getBean("WebUserServiceImpl"));
	}

	public String getActionName() {
		return actionName;
	}

	public void setActionName(String actionName) {
		this.actionName = actionName;
	}

	public List<?> getDatas() {
		return datas;
	}

	public void setDatas(List<?> datas) {
		this.datas = datas;
	}
	
	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public JsonResult getResult() {
		return result;
	}

	public void setResult(JsonResult result) {
		this.result = result;
	}

	public WebUserService getWebUserService() {
		return webUserService;
	}

	public void setWebUserService(WebUserService webUserService) {
		this.webUserService = webUserService;
	}

	public String Do(){
		if(this.getActionName().equals("afLoginOut")){
			ActionContext.getContext().getSession().clear();
			this.setSuccess(true);
			return SUCCESS;
		}
		else
			return this.getActionName();
	}

	public String doLogin() {
		try {
			JSONObject json = JSONObject.fromObject(datas.get(0));
			String userName = json.getString("userName");
			String userPwd = json.getString("userPwd");
			String validateCode = json.getString("validateCode");
			
			String sysValidCode = (String)ActionContext.getContext().getSession().get("rand");
			if(!sysValidCode.equals(validateCode)){
				this.setSuccess(false);
				this.setMsg("验证码错误！");
			}else{		
				WebUser webUser = webUserService.findByUserName(userName);
				if(webUser == null || !webUser.getPassword().equals(userPwd)){
					this.setSuccess(false);
					this.setMsg("用户名或密码错误！");
				}
				else{
					ActionContext.getContext().getSession().put("webUser", webUser);
					ActionContext.getContext().getSession().put("userName",webUser.getUserName());
					ActionContext.getContext().getSession().put("userCname",webUser.getUserCname());
					this.setSuccess(true);
				}
			}
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return LOGIN;
	}
	
	@SuppressWarnings({ "unused", "unchecked" })
	public String getWebMenus(){
		WebUser webUser = (WebUser) ActionContext.getContext().getSession().get("webUser");
		try {
			int nodeId = Integer.parseInt(ServletActionContext.getRequest().getParameter("node"));
	        
			WebRole webRole=webUser.getWebRole();
			List<WebMenu> mList = (List<WebMenu>) webUser.getWebRole().getWebMenus();
		    Filter<WebMenu,Integer> filter = new Filter<WebMenu,Integer>() {
	           public boolean isMatched(WebMenu m, Integer mid) {
	                return (m.getParentid().equals(mid) && m.getShowflag());
	            }
	        };
	        List<WebMenu> menus = new FilterList<Integer>().filterList(mList, filter, nodeId);
	        this.setResult(new JsonResult(menus,menus.size()));
	        this.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			this.setMsg("菜单获取失败！");
			this.setSuccess(false);
		}
		return SUCCESS;
	}
}