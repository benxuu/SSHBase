package ahut.ie.model;

import java.util.List;

public class WebRole implements java.io.Serializable {
	private static final long serialVersionUID = -3682784821265470458L;
	private String rolecode;
	private String rolename;
	private String memo;
	private List<?> webMenus;

	public WebRole() {
	}

	public WebRole(String rolename, String memo, List<?> webMenus){
		this.rolename = rolename;
		this.memo = memo;
		this.webMenus = webMenus;
	}

	public String getRolecode() {
		return this.rolecode;
	}

	public void setRolecode(String rolecode) {
		this.rolecode = rolecode;
	}

	public String getRolename() {
		return this.rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public List<?> getWebMenus() {
		return this.webMenus;
	}

	public void setWebMenus(List<?> webMenus) {
		this.webMenus = webMenus;
	}
}