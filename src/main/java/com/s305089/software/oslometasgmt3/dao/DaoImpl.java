package com.s305089.software.oslometasgmt3.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.GenericTypeResolver;
import org.springframework.core.ResolvableType;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManagerFactory;
import java.lang.reflect.ParameterizedType;
import java.util.List;

@Component
public abstract class DaoImpl<T> {

    private final Class<T> type;

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @SuppressWarnings("unchecked")
    public DaoImpl() {
        ParameterizedType superclass = (ParameterizedType) (this.getClass().getGenericSuperclass());
        this.type = (Class<T>) superclass.getActualTypeArguments()[0];
    }

    private Session getSession() {
        //https://stackoverflow.com/a/25064080/

        SessionFactory factory = entityManagerFactory.unwrap(SessionFactory.class);
        if (factory == null) throw new RuntimeException("Could not get session factory of type Hibernate");
        return factory.getCurrentSession();
    }

    
    public T findById(Long entId) {
        return getSession().get(type, entId);
    }

    
    public void saveOrUpdate(T entity) {
        getSession().saveOrUpdate(entity);
    }

    
    public void delete(T ent) {
        getSession().delete(ent);
    }
    
    @SuppressWarnings("unchecked")
    
    public List<T> getAll() {
        Session s = getSession();
        Query query = s.createQuery("from " + type.getSimpleName());
        return query.list();
    }


}
