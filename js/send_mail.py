import json
from python.classes.modules.zmodule_v2.zutility.elements_casting import ElementCasting
from python.classes.modules.zmodule_v2.zutility import random_password_generator,public_links, user_management, communications,data_copying, elements_utility
from python.classes.modules.zmodule_v2 import zsubmissions, ztasks, zautomation
from python.classes.modules.common.loggerClass import LoggerClass as LogClass

onboarding_forms = {
       "63aadafa8e5534f781ea66d8": {          
        "User Name": "EID_c3u82fkx7y",
        "User ID": "EID_di7rzsct7b",
        "User Email": "EID_j78oyayf95"      
    }
}

user_id = None
if automation_inputs["formID"] in onboarding_forms:
    user_id = automation_inputs[onboarding_forms[automation_inputs["formID"]]["User ID"]]
user_email = None
user_id = None
user_name = None

public_submission_links = {}

for form, elements in onboarding_forms.items():
    task_form_submission = zsubmissions.search_submissions(form, ["User ID"], [user_id])
    if task_form_submission:
        task_form_submission_id = task_form_submission[0]["id"]
        public_submission_links[form]=public_links.get_public_submission_link(task_form_submission_id)

if form == "63aadafa8e5534f781ea66d8":
    user_name_element = elements_utility.get_form_element(task_form_submission[0]["elements"], "elementId", elements["User Name"])
    user_name_mail_element = ElementCasting.convert_element_to_edit_text(user_name_element)

    user_id_element = elements_utility.get_form_element(task_form_submission[0]["elements"], "elementId", elements["User ID"])
    user_id_mail_element = ElementCasting.convert_element_to_edit_text(user_id_element)

    user_email_element = elements_utility.get_form_element(task_form_submission[0]["elements"], "elementId", elements["User Email"])
    user_email_mail_element = ElementCasting.convert_element_to_edit_text(user_email_element)

email_variable = {
    "User Email": user_email,
    "User ID": user_id,
    "User Name": user_name
}

LogClass.warning("script-logs", {"message": "Here you can see the Email ID","response": user_email})
subject_template_id = "2"
message_template_id = "3"
subject_configs = {"template_id": subject_template_id, "variables": email_variable}
message_cofnigs = {"template_id": message_template_id, "variables": email_variable}
email_response = communications.send_mail_to_roles([user_email], subject_configs, message_cofnigs)
LogClass.warning("script-logs", {"message": "Email Response Send Mail {}".format(automation_inputs["formID"]), "response": email_response})