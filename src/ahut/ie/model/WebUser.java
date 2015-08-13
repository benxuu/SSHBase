package ahut.ie.model;

public class WebUser implements java.io.Serializable {
	private static final long serialVersionUID = 4752020751422860124L;
	
	private String userName;
	private WebRole webRole;
	private String userCname;
	private String password;
	private String mobile;
	private String email;
    private Integer isLock;

	public WebUser() {
	}

	public WebUser(WebRole webRole,String userCname,
			String password, String userTypeCode, String orgCode,
			String mobile, String email) {
		this.webRole = webRole;
		this.userCname = userCname;
		this.password = password;
		this.mobile = mobile;
		this.email = email;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public WebRole getWebRole() {
		return this.webRole;
	}

	public void setWebRole(WebRole webRole) {
		this.webRole = webRole;
	}

	public String getUserCname() {
		return this.userCname;
	}

	public void setUserCname(String userCname) {
		this.userCname = userCname;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	

	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getIsLock() {
		return isLock;
	}

	public void setIsLock(Integer isLock) {
		this.isLock = isLock;
	}
}