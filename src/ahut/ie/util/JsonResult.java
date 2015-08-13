package ahut.ie.util;


import java.util.List;

public class JsonResult {
	private boolean success;
	private String msg;
	private List<?> list;
	private long total;
	
	public JsonResult(){
	}
	
	public JsonResult(List<?> lst,long total){
		this.setList(lst);
		this.setTotal(total);
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

	public List<?> getList() {
		return list;
	}
	
	public void setList(List<?> list) {
		this.list = list;
	}
	
	public long getTotal() {
		return total;
	}
	
	public void setTotal(long total) {
		this.total = total;
	}
}