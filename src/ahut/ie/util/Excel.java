package ahut.ie.util;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.lang.reflect.Method;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.hpsf.DocumentSummaryInformation;
import org.apache.poi.hpsf.SummaryInformation;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.ServletActionContext;

public class Excel {
	private String company;
	private String subject;
    private String fileName;
    private String fullFileName;  
    private HSSFWorkbook hssfworkbook;
    
    public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
		this.fullFileName = ServletActionContext.getServletContext().getRealPath("/")+ "\\Excel\\" + fileName;
	}

	public String getFullFileName() {
		return fullFileName;
	}

	public void setFullFileName(String fullFileName) {
		this.fullFileName = fullFileName;
	}

	public HSSFWorkbook getHssfworkbook() {
		return hssfworkbook;
	}

	public void setHssfworkbook(HSSFWorkbook hssfworkbook) {
		this.hssfworkbook = hssfworkbook;
	}

	public Excel(){
		this.setFileName("excel.xls");
		InitializeWorkbook(this.getFileName());
	}
	
	public Excel(String fileTitle){
		this.setFileName(fileTitle + ".xls");
		InitializeWorkbook(this.getFileName());
	}
	
	public void InitializeWorkbook(){
		InitializeWorkbook("excel.xls");
	}
	
	public void InitializeWorkbook(String fileName)
    {
    	this.setFileName(fileName);
		InitializeWorkbook(fileName,"中国标准研究院", "Excel报表");
    }

    public void InitializeWorkbook(String fileName,String company, String subject)
    {
    	this.setFileName(fileName);
    	this.setCompany(company);
    	this.setSubject(subject);
    	setDocumentInfo();
    }
   
    public void setDocumentInfo()
    {
        hssfworkbook = new HSSFWorkbook();
        
        hssfworkbook.createInformationProperties();
        ////文档公司信息
        DocumentSummaryInformation dsi = hssfworkbook.getDocumentSummaryInformation();
        dsi.setCompany(this.getCompany());

        ////文档主题
        SummaryInformation si = hssfworkbook.getSummaryInformation();
        si.setSubject(this.getSubject());
    }

    public void toExcel(List<?> tList, String[] headers,String[] cheaders){
    	if(getExcel(tList,headers,cheaders))
    		directDown();
    }

    private boolean getExcel(List<?> tList, String[] headers,String[] cheaders){
        int irow = 0, sheetNum = 1;

        HSSFSheet sheet = hssfworkbook.createSheet("Sheet" + sheetNum++);

        HSSFRow row = sheet.createRow(irow++);

        for (int i = 0; i < cheaders.length; i++)
            row.createCell(i).setCellValue(cheaders[i]);

        for(Object e :tList){
        	row = sheet.createRow(irow++);
            for (int j = 0; j < headers.length; j++){
                Method m;
				try {
					m = (Method) e.getClass().getMethod("get" + getMethodName(headers[j]));
					 row.createCell(j).setCellValue(m.invoke(e)== null ? "" : m.invoke(e).toString());
				} catch (Exception exp) {
					exp.printStackTrace();
					return false;
				}
            }
            
            if (irow >= 65535)
            {
                sheet = hssfworkbook.createSheet("Sheet" + sheetNum++);
                irow = 0;
            }
        }
    	return true;
    }
 
    public boolean ToFile(List<?> tList, String[] headers,String[] cheaders)
    {
    	if(getExcel(tList,headers,cheaders)){
    		FileOutputStream fOut;
    		try {
    			fOut = new FileOutputStream(fileName);
    			hssfworkbook.write(fOut);
    			fOut.flush();
    			fOut.close();
    		} catch (Exception fileExp) {
    			fileExp.printStackTrace();
    			return false;
    		}
    	}
		return true;
    }

	private void directDown(){
		HttpServletResponse response = ServletActionContext.getResponse();
        response.reset();
        response.setCharacterEncoding("UTF-8");
		try {
			response.addHeader("Content-Disposition", "attachment;filename=" + new String(this.getFileName().getBytes("gb2312"),"ISO8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
        response.setContentType("application/octet-stream");
        
        try{
        	OutputStream httpOut = response.getOutputStream();
			hssfworkbook.write(httpOut);
			httpOut.flush();
			httpOut.close();
		} catch (Exception httpExp) {
			httpExp.printStackTrace();
		}
	}
    
    private static String getMethodName(String fildeName) throws Exception{
		byte[] items = fildeName.getBytes();
		items[0] = (byte) ((char) items[0] - 'a' + 'A');
		return new String(items);
	}
}