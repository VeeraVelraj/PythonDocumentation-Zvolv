import json
from python.classes.modules.common import common_util
input_data={}
master_id = COM.get_form_ids("SCC Head Required Parameters Master")
stakeholder_master_id = COM.get_form_ids("Stakeholder Mapping Master")
stakeholder_master_data = common_util.fetech_master_data(COM, stakeholder_master_id, key="SCC",val=common_util.formsearch_to_textfield(botInputDict["I1:SCC"]))
if stakeholder_master_data:
    for head_name in stakeholder_master_data:
        input_data = {
            "SCC": botInputDict["I1:SCC"],
            "Parameters": common_util.generate_multiselect_object([botInputDict["I1:Parameter"]]),
            "Units":common_util.generate_multiselect_object([botInputDict["I1:Unit"]]),
				   "Lower Limit": botInputDict["I1:Lower Limit"],
				   "Upper Limit" : botInputDict["I1:Upper Limit"],
				   "Old SCC" : common_util.generate_multiselect_object([botInputDict["I1:SCC"]]),
				   "Old Parameters" : common_util.generate_multiselect_object([botInputDict["I1:Parameter"]]),
				   "Applicable" : "Yes",
                   "EHS Manager":json.loads(head_name["EHS Manager Name"]), 
                   "User":stakeholder_master_data[0]["SCC Head Name"],
                   "wid": body["WorkflowID"]
                   }
        resp = COM.form_submission_using_NEW_API(master_id,input_data, donotcall="true")
        block_task = []
wid = body["WorkflowID"]
task_data = common_util.bulkWorkflowEdit({"title": "Update Parameter Limits"}, {"task_data": {"Status": "Locked"}})
block_task.append(task_data)
bulk_edit = COM.bulkWFStagesEdit(wid, block_task)
