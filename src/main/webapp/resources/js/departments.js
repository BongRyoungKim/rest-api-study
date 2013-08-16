$(function() {
    console.log("departments!");
    $("#departmentNav").addClass("active");
    $("#employeeNav").hide();

    bindBtnAddDepartment();
    bindBtnUpdateDepartment();
    bindBtnDeleteDepartment();
    bindBtnDeleteDepartmentConfirm();
    bindBtnConfirm();

    getDepartments();
});

var getDepartments = function() {
    $.get(url.departments, function(data) {
        if(data.departments.content.length) {
            renderTemplate($("#departmentTable").find("tbody"), "#departmentTemplate", data.departments.content, true);
            $("#departmentTable").find("tfoot").hide();
        }
    });
};

var bindBtnAddDepartment = function() {
    $(document).on("click", ".btn-add-department", function() {
        departmentModal("post");
        $("#departmentModal").modal("show");
    });
};

var departmentModal = function (method, departmentId) {
    var methodLabel = "";
    if (method === "post") {
        methodLabel = labels.add;
    } else if (method === "put") {
        methodLabel = labels.modify;
    }
    $("#modalTypeLabel").text(methodLabel);
    $("#modalButtonLabel").text(methodLabel);

    $("#departmentModal").data("method", method);
    $("#departmentModal").data("id", departmentId);
    $("input.form-control").val("");
    $("#departmentModal").modal("show");
};

var bindBtnConfirm = function() {
    $(document).on("click", ".btn-confirm", function() {
        var method = $("#departmentModal").data("method");
        if(method === "post") {
            saveDepartment();
        } else if(method === "put") {
            updateDepartment();
        }
    });
};

var saveDepartment = function() {
    console.log("saveDepartment");
    getDepartments();

    var form = {
        name: $("#name").val(),
        description: $("#description").val()
    };

    $.ajax({
        url: url.departments,
        method: "post",
        type: "json",
        contentType: "application/json",
        data: JSON.stringify(form),
        success: function(data) {
            $("#departmentModal").modal("hide");
            getDepartments();
        }
    });
};

var updateDepartment = function() {
    var departmentId = $("#departmentModal").data("id");
    getDepartments();

    var form = {
        name: $("#name").val(),
        description: $("#description").val()
    };

    $.ajax({
        url: url.departments + "/" + departmentId,
        method: "put",
        type: "json",
        contentType: "application/json",
        data: JSON.stringify(form),
        success: function(data) {
            $("#departmentModal").modal("hide");
            getDepartments();
        }
    });
};

var bindBtnUpdateDepartment = function() {
    $(document).on("click", ".btn-update-department", function(event) {
        $target = $(event.target);
        departmentModal("put", $target.data("id"));
        $("#name").val($target.data("name"));
        $("#description").val($target.data("description"));
        $("#departmentModal").modal("show");
    });
};

var bindBtnDeleteDepartment = function() {
    $(document).on("click", ".btn-delete-department", function(event) {
        $("#deleteDepartmentModal").data("id", $(event.target).data("id"));
        $("#deleteDepartmentModal").modal("show");
    });
};

var bindBtnDeleteDepartmentConfirm = function() {
    $(document).on("click", ".btn-delete-department-confirm", function() {
        getDepartments();
        var departmentId = $("#deleteDepartmentModal").data("id");

        $.ajax({
            url: url.departments + "/" + departmentId,
            method: "delete",
            type: "json",
            success: function(data) {
                $("#deleteDepartmentModal").modal("hide");
                getDepartments();
            }
        });
    });
};