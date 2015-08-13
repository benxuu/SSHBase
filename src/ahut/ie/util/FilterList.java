package ahut.ie.util;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
public class FilterList <E> {
    public  <T> List<T> filterList(List<T> originalList, Filter<T, E> filter, E text) {
        List<T> filterList = new ArrayList<T>();
        for (T object : originalList) {
            if (filter.isMatched(object, text)) {
                filterList.add(object);
            } else {
                continue;
            }
        }
        return filterList;
    }
    static public String getSqlFilter(String extFilters) {
		StringBuilder sqlFilter = new StringBuilder();
		String type = null;
		String comparison = null;
		String value = null;
		String field = null;
		String opera = " ";
		try {
			JSONArray jsonArr = JSONArray.fromObject(extFilters);
			for (int i = 0; i < jsonArr.size(); i++) {
				JSONObject jsonObj = jsonArr.getJSONObject(i);

				type = jsonObj.getString("type");
				value = jsonObj.getString("value");
				field = jsonObj.getString("field");

				if (jsonObj.containsKey("comparison"))
					comparison = jsonObj.getString("comparison");

				if (type.equals("string"))
					sqlFilter
							.append(opera + field + " like '%" + value + "%' ");
				else if (type.equals("numeric")) {
					if (comparison.equals("lt")) {
						sqlFilter.append(opera + field + " < " + value);
					} else if (comparison.equals("eq")) {
						sqlFilter.append(opera + field + " = " + value);
					} else if (comparison.equals("gt")) {
						sqlFilter.append(opera + field + " > " + value);
					}
				} else if (type.equals("date")) {
					if (comparison.equals("lt")) {
						sqlFilter
								.append(opera + field + " <= to_date('" + value
										+ " 23:59:59','yyyy-mm-dd hh24:mi:ss')");
					} else if (comparison.equals("eq")) {
						sqlFilter.append(opera + field + " between to_date('"
								+ value + " 00:00:00','yyyy-mm-dd hh24:mi:ss')"
								+ " and to_date('" + value
								+ " 23:59:59','yyyy-mm-dd hh24:mi:ss')");
					} else if (comparison.equals("gt")) {
						sqlFilter
								.append(opera + field + " >= to_date('" + value
										+ " 00:00:00','yyyy-mm-dd hh24:mi:ss')");
					}
				} else if (type.equals("boolean"))
					sqlFilter.append(opera + field + " = "
							+ (value == "true" ? '1' : '0'));
				opera = " and ";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sqlFilter.toString();
	}

} 