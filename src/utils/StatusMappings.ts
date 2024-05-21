export class StatusMappings {
  readonly ActivationStatus: { [id: number | string]: string | number } = {
    0: "Not Yet Invited",
    1: "Invitation Sent",
    2: "Re-Invited",
    3: "Logged-in First time",
    4: "First Scan Completed",
    5: "Recently Active",
    6: "Moderately Active",
    7: "Inactive",
    "Not Yet Invited": 0,
    "Invitation Sent": 1,
    "Re-Invited": 2,
    "Logged-in First time": 3,
    "First Scan Completed": 4,
    "Recently Active": 5,
    "Moderately Active": 6,
    "Inactive": 7,
  };
  //status
  readonly TechnicianBlockStatus: { [id: number | string]: string | number } = {
    0: "Scan Block",
    1: "Active",
    2: "Temporary Block",
    3: "Permanent Block",
    "Scan Block": 0,
    "Active": 1,
    "Temporary Block": 2,
    "Permanent Block": 3,
  };

  readonly CategoryBlockStatus: {[id: number | string]: string | number} = {
    0: "Block",
    1: "Active",
    "Block": 0,
    "Active": 1,
  }
}