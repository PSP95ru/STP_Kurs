package dank3.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dank3.demo.entities.FlowchartSchema;
import dank3.demo.repositories.SchemaRepository;

@Service
public class SchemaService {
    @Autowired
    private SchemaRepository schemaRepository;

    public FlowchartSchema findByName(String s) {
        return schemaRepository.findByName(s);
    }

    public Long save(FlowchartSchema s) {
        return schemaRepository.save(s).getId();
    }

    public void remove(FlowchartSchema s) {
        schemaRepository.deleteById(s.getId());
    }
    
}
