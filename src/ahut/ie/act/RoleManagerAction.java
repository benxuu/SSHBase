package ahut.ie.act;


import java.util.ArrayList;
import java.util.List;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import ahut.ie.dao.support.Page;
import ahut.ie.model.TreeNodeDTO;
import ahut.ie.model.WebMenu;
import ahut.ie.model.WebRole;
import ahut.ie.service.WebMenuService;
import ahut.ie.service.WebRoleService;
import ahut.ie.util.Filter;
import ahut.ie.util.FilterList;
import ahut.ie.util.JsonResult;
import ahut.ie.util.SpringContextUtil;

import com.opensymphony.xwork2.ActionSupport;

public class RoleManagerAction extends ActionSupport {
	private static final long serialVersionUID = -7097288397033467551L;

	private JsonResult result;
	private boolean success;
	private WebRoleService webRoleService;
	private WebMenuService webMenuService;
	private List<?> datas;
	private String rolecode;
	public String getRolecode(){
	   return this.rolecode;
	}
	public void setRolecode(String rolecode)
	{
		this.rolecode=rolecode;
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

	public WebRoleService getWebRoleService() {
		this.webRoleService=(WebRoleService)SpringContextUtil.getBean("WebRoleServiceImpl");
		return webRoleService;
	}

	public void setWebRoleService(WebRoleService webRoleServiceImpl) {
		this.webRoleService = webRoleServiceImpl;
	}
	public WebMenuService getWebMenuService() {
		this.webMenuService=(WebMenuService)SpringContextUtil.getBean("WebMenuServiceImpl");
		return webMenuService;
	}

	public void setWebMenuService(WebMenuService WebMenuServiceImpl) {
		this.webMenuService = WebMenuServiceImpl;
	}
	public String Page()
	{
		return "page";
	}

	public String RoleList(){
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
		Page<WebRole> pageList =this.getWebRoleService().pageQuery(startNo,
				pageSize, filter, orders);
		setResult(new JsonResult(pageList.getResult(), pageList.getTotalCount()));
		this.setSuccess(true);
		return SUCCESS;
	}
	
	public String AddRole()
	{
		JSONObject json = JSONObject.fromObject(datas.get(0)); // 转换为json对象格式
		try {
			
			WebRole webRole = (WebRole) JSONObject.toBean(
					json,WebRole.class);// 将json对象转换为javaBean
			this.getWebRoleService().addWebRole(webRole);
			this.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			this.setSuccess(false);
		}
		return SUCCESS;
	
	}
	public String DelRole()
	{
		try{
		    WebRole webRole=this.getWebRoleService().getWebRoleByRoleCode(rolecode);
		    this.webRoleService.deleteWebRole(webRole);
		    this.setSuccess(true);
	    } catch(Exception e){
		
	    	e.printStackTrace();
	    	this.setSuccess(false);
	    }
		return SUCCESS;
	}
	public String UpdataRole(){
		JSONObject json = JSONObject.fromObject(datas.get(0)); // 转换为json对象格式
		try {
			
			WebRole webRole= (WebRole) JSONObject.toBean(
					json,WebRole.class);// 将json对象转换为javaBean
			this.getWebRoleService().updateWebRole(webRole);
			this.setSuccess(false);
		} catch (Exception e) {
			e.printStackTrace();
			this.setSuccess(false);
		}
		return SUCCESS;
	
	}
   public WebRole GetRoleInfo(){
	   return this.getWebRoleService().getWebRoleByRoleCode(rolecode);
	    
   }
   public String GetAll()
   {
	   List<?> list= this.getWebRoleService().getAll();
	   setResult(new JsonResult(list,list.size()));
	   return SUCCESS;
   }
   
   public String getWebMenus(){
		
		try {
			int nodeId = Integer.parseInt(ServletActionContext.getRequest().getParameter("node"));
	        
			@SuppressWarnings("unchecked")
			
			List<WebMenu> mList = (List<WebMenu>) this.getWebMenuService().getWebMenusByParentId(nodeId);
		    Filter<WebMenu,Integer> filter = new Filter<WebMenu,Integer>() {
	           public boolean isMatched(WebMenu m, Integer mid) {
	                return (m.getShowflag());
	            }
	        };
	        List<WebMenu> menus = new FilterList<Integer>().filterList(mList, filter, nodeId);
	        List<TreeNodeDTO> ListMenu=new ArrayList<TreeNodeDTO>();// ;
	        TreeNodeDTO Node;
	         for (WebMenu webMenu :menus)
	        
	        {
        	    Node = new TreeNodeDTO();
	        	 
                Node.setId(webMenu.getId());
                Node.setOrderid(webMenu.getOrderid());
                Node.setParameters(webMenu.getParam());
                Node.setParentid(webMenu.getParentid());
                Node.setText(webMenu.getText());
                Node.setQtip(webMenu.getQtip());
                Node.setIconCls(webMenu.getIconCls());
                Node.setUrl(webMenu.getUrl());
                Node.setLeaf(webMenu.getLeaf());
                Node.setChecked(false);
                
                ListMenu.add(Node);
	        	
	        }
	        this.setResult(new JsonResult(ListMenu,ListMenu.size()));
	        this.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			
			this.setSuccess(false);
		}
		return SUCCESS;
	}
   
   
   
   public String RoleRightAdd()
   {
	  String roleMenu= ServletActionContext.getRequest().getParameter("roleMenu");
       Boolean addstatus = true;
       WebRole webRole = this.getWebRoleService().getWebRoleByRoleCode(rolecode);
       List<WebMenu>menuList=new ArrayList<WebMenu>();
     
       webRole.setWebMenus(null);
       String[] menuIds = roleMenu.split(",");
       try {
		for(int i=0;i<menuIds.length;i++)
		   {
		       menuList.add(this.getWebMenuService().getWebMenuByMenuId(Integer.valueOf(menuIds[i])));
		   }
		   webRole.setWebMenus(menuList);
		   addstatus = addstatus && (this.getWebRoleService().updateWebRole(webRole));
	} catch (Exception e) {
		e.printStackTrace();
	}
      
       if (addstatus)
       {
           this.setSuccess(true);
           return SUCCESS;

       }
       else
       {
          this.setSuccess(false);
         return SUCCESS;
       }
     
   }
   }

