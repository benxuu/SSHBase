package ahut.ie.model;

public class WebMenu implements java.io.Serializable {
	private static final long serialVersionUID = 5952713418482491456L;
	
	private Integer id;
	private Integer orderid;
	private Integer parentid;
	private String text;
	private String qtip;
	private String url;
	private String iconCls;
	private Boolean leaf;
	private Boolean showflag;
    private String param;
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public WebMenu() {
	}

	public WebMenu(Integer orderid, Integer parentid, String text, String qtip,
			String url, String iconCls, Boolean leaf, Boolean showflag) {
		this.orderid = orderid;
		this.parentid = parentid;
		this.text = text;
		this.qtip = qtip;
		this.url = url;
		this.iconCls = iconCls;
		this.leaf = leaf;
		this.showflag = showflag;

	}



	public Integer getOrderid() {
		return this.orderid;
	}

	public void setOrderid(Integer orderid) {
		this.orderid = orderid;
	}

	public Integer getParentid() {
		return this.parentid;
	}

	public void setParentid(Integer parentid) {
		this.parentid = parentid;
	}

	public String getText() {
		return this.text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getQtip() {
		return this.qtip;
	}

	public void setQtip(String qtip) {
		this.qtip = qtip;
	}

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getIconCls() {
		return this.iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public Boolean getLeaf() {
		return this.leaf;
	}

	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}

	public Boolean getShowflag() {
		return this.showflag;
	}

	public void setShowflag(Boolean showflag) {
		this.showflag = showflag;
	}
}