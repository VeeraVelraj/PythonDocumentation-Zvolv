import json
from python.classes.modules.zmodule_v2.zutility.elements_casting import ElementCasting
from python.classes.modules.zmodule_v2.zutility import random_password_generator,public_links, user_management, communications,data_copying, elements_utility
from python.classes.modules.zmodule_v2 import zsubmissions, ztasks, zautomation
from python.classes.modules.common.loggerClass import LoggerClass as LogClass

onboarding_forms = {
    "62a2ae3d79b949a5b71b2300": {           # 1.1 Client - Family Information
        "Client ID": "EID_lfp2fip41p"
    },
    "62a1bb4579b949a5b71b180e": {           # 1.2 Client - Insurance Information
        "Client ID": "EID_qhe9gx7i4e"
    },
    "62a1b31a79b949a5b71b171b": {           # 1.3 Client - Diagnosis Details & Therapy History
        "Client ID": "EID_tn5je438ho"
    },
    "63311ef9769286937cd8bb77": {           # Client Onboarding Master
        "Client ID": "EID_1eq2dkr84g",
        "Child First Name": "EID_dt87grg37j",
        "Child Last Name": "EID_3bq7yp2xnv",
        "Primary Email": "EID_o1blbanfvj"
    }
}

client_id = None
if automation_inputs["formID"] in onboarding_forms:
    client_id = automation_inputs[onboarding_forms[automation_inputs["formID"]]["Client ID"]]

child_first_name = None
child_last_name = None
parent_email = None

public_submission_links = {}
for form, elements in onboarding_forms.items():
    task_form_submission = zsubmissions.search_submissions(form, ["Client ID"], [client_id])
    if task_form_submission:
        task_form_submission_id = task_form_submission[0]["id"]
        public_submission_links[form]=public_links.get_public_submission_link(task_form_submission_id)

        if form == "63311ef9769286937cd8bb77":
            child_first_name_element = elements_utility.get_form_element(task_form_submission[0]["elements"], "elementId", elements["Child First Name"])
            child_first_name = ElementCasting.convert_element_to_edit_text(child_first_name_element)

            child_last_name_element = elements_utility.get_form_element(task_form_submission[0]["elements"], "elementId", elements["Child Last Name"])
            child_last_name = ElementCasting.convert_element_to_edit_text(child_last_name_element)

            parent_email_element = elements_utility.get_form_element(task_form_submission[0]["elements"], "elementId", elements["Primary Email"])
            parent_email = ElementCasting.convert_element_to_edit_text(parent_email_element)

email_variable = {
    "User Name": child_first_name + " " + child_last_name,
    "family info submission": public_submission_links["62a2ae3d79b949a5b71b2300"] if "62a2ae3d79b949a5b71b2300" in public_submission_links else None,
    "insurance submission": public_submission_links["62a1bb4579b949a5b71b180e"] if "62a1bb4579b949a5b71b180e" in public_submission_links else None,
    "diagnosis submission": public_submission_links["62a1b31a79b949a5b71b171b"] if "62a1b31a79b949a5b71b171b" in public_submission_links else None,
    "Primary Email": parent_email,
    "Password": "Please check first mail for password",
    "Client ID": client_id
}

subject_template_id = "1"
message_template_id = "2"
subject_configs = {"template_id": subject_template_id, "variables": email_variable}
message_cofnigs = {"template_id": message_template_id, "variables": email_variable}
email_response = communications.send_mail_to_roles([client_id], subject_configs, message_cofnigs)
LogClass.warning("script-logs", {"message": "Email Response Send Mail {}".format(automation_inputs["formID"]), "response": email_response})