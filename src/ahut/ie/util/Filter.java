package ahut.ie.util;

public abstract class Filter<T,E>{
	public abstract boolean isMatched(T object, E text);
}
