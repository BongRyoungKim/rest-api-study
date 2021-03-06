package net.slipp.rest.domain;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;

import lombok.Data;
import lombok.ToString;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 * 회사 도메인
 *
 * @author: ihoneymon
 * Date: 13. 7. 22
 */
@Data
@Entity
@ToString(exclude = {"department"})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Company implements Serializable {
    private static final long serialVersionUID = 2555196948716599267L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String tel;
    private String address;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("name asc")
    private Department department = new Department(null, name + "_root", "Root Department");

    public Company() {
    }

    public Company(String name) {
        this.name = name;
    }
}
