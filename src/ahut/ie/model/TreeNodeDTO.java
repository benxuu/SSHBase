package ahut.ie.model;

import java.util.List;

public class TreeNodeDTO {
	private Integer id;// The node id
	private Integer orderid;
    private Integer parentid;
  
	private String text;
	private String qtip;
	private String url;
	private String parameters;
	private String iconCls;
	private Boolean leaf;
	private Boolean showflag;
	private Boolean checked;

	private List<TreeNodeDTO> children;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getOrderid() {
		return orderid;
	}

	public void setOrderid(Integer orderid) {
		this.orderid = orderid;
	}

	public Integer getParentid() {
		return parentid;
	}

	public void setParentid(Integer parentid) {
		this.parentid = parentid;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getQtip() {
		return qtip;
	}

	public void setQtip(String qtip) {
		this.qtip = qtip;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public Boolean getLeaf() {
		return leaf;
	}

	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}

	public Boolean getShowflag() {
		return showflag;
	}

	public void setShowflag(Boolean showflag) {
		this.showflag = showflag;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getParameters() {
		return parameters;
	}

	public void setParameters(String parameters) {
		this.parameters = parameters;
	}

	public Boolean getChecked() {
		return checked;
	}

	public void setChecked(Boolean checked) {
		this.checked = checked;
	}

	public List<TreeNodeDTO> getChildren() {
		return children;
	}

	public void setChildren(List<TreeNodeDTO> children) {
		this.children = children;
	}
}
