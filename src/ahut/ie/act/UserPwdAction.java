package ahut.ie.act;



import ahut.ie.model.WebUser;
import ahut.ie.service.WebUserService;
import ahut.ie.util.SpringContextUtil;

import com.opensymphony.xwork2.ActionSupport;
public class UserPwdAction extends ActionSupport {
	private static final long serialVersionUID = -71503096240731465L;

	private boolean success;
	private String msg;
	private String username;
	private String password;
	private String newpassword;
	private WebUserService webUserServiceImpl;

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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNewpassword() {
		return newpassword;
	}

	public void setNewpassword(String newpassword) {
		this.newpassword = newpassword;
	}

	public UserPwdAction() {
		this.webUserServiceImpl = (WebUserService) SpringContextUtil
				.getBean("WebUserServiceImpl");
	}

	public String Page() {
		return "page";
	}

	public String chg() {
		WebUser webUser = webUserServiceImpl.findByUserName(username);
		if (webUser == null) {
			this.setSuccess(false);
			this.setMsg("没有该用户！");
		}
		if (!password.equals(webUser.getPassword())) {
			this.setSuccess(false);
			this.setMsg("原密码错误！");
		} else {
			webUser.setPassword(newpassword);
			try {
				webUserServiceImpl.update(webUser);
			} catch (Exception e) {
				e.printStackTrace();
			}

			this.setSuccess(true);
			this.setMsg("用户密码修改成功！");
		}
		return SUCCESS;
	}
}