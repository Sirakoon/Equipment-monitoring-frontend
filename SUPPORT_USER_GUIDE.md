# 🎨 Support Module - User Guide

## Overview

The Support Module is your gateway to submit, track, and manage support tickets for any equipment monitoring issues or feature requests.

---

## 🚀 Getting Started

### Access Support Module

**Option 1: From Dashboard**
1. Login to Equipment Monitoring System
2. Click on the "Support & Help" module card on the homepage
3. You'll be directed to the Support page

**Option 2: From Navigation Menu**
1. Login to Equipment Monitoring System
2. Click "Support" in the top navigation bar
3. Access the full Support dashboard

**Direct URL**: `http://localhost:5173/Support`

---

## 📊 Dashboard Overview

### Statistics Cards (Top Section)

| Card | Shows | Purpose |
|------|-------|---------|
| **Total Tickets** | All tickets ever submitted | Overall system usage |
| **Open** | Tickets waiting for response | Immediate attention needed |
| **In Progress** | Tickets being worked on | Actively being resolved |
| **Resolved** | Tickets with solution provided | Awaiting confirmation |
| **High Priority** | Critical tickets count | Urgent issues tracking |

### Main Interface

```
┌─────────────────────────────────────────────────┐
│  Support Dashboard                              │
├─────────────────────────────────────────────────┤
│ [📊 Stats Cards]                                │
│                                                 │
│ ┌─ Filters ──────────────────────────────────┐ │
│ │ [🔍 Search] [Status ▼] [Priority ▼]       │ │
│ │ [+ New Ticket]                             │ │
│ └────────────────────────────────────────────┘ │
│                                                 │
│ ┌─ Ticket List ──────────────────────────────┐ │
│ │ [Ticket Cards with Status & Priority]      │ │
│ │ [Click to view details]                    │ │
│ └────────────────────────────────────────────┘ │
│                                                 │
│ [Detail View / Comment Thread on Selection]   │
└─────────────────────────────────────────────────┘
```

---

## 📝 Creating a Support Ticket

### Step 1: Click "New Ticket"
Look for the blue "+ New Ticket" button at the top of the page.

### Step 2: Fill in the Form

**Required Fields** (marked with *)
- **Title*** - Brief subject of the issue
  - Example: "CNC Machine Health Score Not Updating"
  - Keep it concise but descriptive

- **Description*** - Detailed explanation
  - What's happening?
  - When did it start?
  - What's the impact?
  - Example: 
    ```
    The health score for CNC Machine 3 stopped updating 
    after maintenance on March 30. It shows 85% but should 
    be 92% based on recent performance data.
    ```

- **Category*** - Type of issue
  - **bug** - System error or defect
  - **feature** - New capability request
  - **performance** - Speed/optimization issue
  - **inquiry** - General question
  - **other** - Miscellaneous

**Optional Fields**
- **Priority** - Issue urgency (default: Medium)
  - Low - Minor cosmetic issue
  - Medium - Moderate impact
  - High - Major feature affected
  - Critical - System down/data risk

- **Email** - For notifications (optional)
  - You receive updates at this email

### Step 3: Submit
Click "Create Ticket" button.

### Result
- ✅ Ticket created successfully
- 🎟️ Ticket number assigned (SUP-2026-XXX)
- 📧 Confirmation displayed
- 📋 Ticket appears in list with "Open" status

---

## 🔍 Searching & Filtering Tickets

### Search Bar
Type to search across all ticket fields:
- Ticket number (SUP-2026-001)
- Title
- Description
- Category

**Example Searches**:
- "CNC" - Shows all tickets mentioning CNC
- "SUP-2026-003" - Find specific ticket
- "health" - Show tickets about health scores

### Status Filter
Click dropdown to filter by status:
- **Open** - Waiting for review
- **In Progress** - Being worked on
- **Resolved** - Solution provided
- **Closed** - Completed
- **Won't Fix** - Rejected/Not fixing

**Example**: View "Open" status to see urgent tickets

### Priority Filter
Click dropdown to filter by priority:
- **Critical** - Immediate attention
- **High** - Urgent
- **Medium** - Standard
- **Low** - Low urgency

**Example**: View only "High" and "Critical" to focus on urgent issues

### Combined Filtering
Use multiple filters together:
1. Filter Status: "Open"
2. Filter Priority: "High"
3. Search: "CNC"

Result: High-priority open tickets about CNC issues

---

## 👁️ Viewing Ticket Details

### Click on a Ticket Card
Select any ticket from the list to view full details.

### Information Displayed

```
┌─ Ticket Details ────────────────────┐
│ 🎟️ SUP-2026-001                    │
│ Title: Equipment health score...   │
│ Status: 🟡 IN PROGRESS             │
│ Priority: 🔴 HIGH                  │
│ Category: Bug                       │
│ Created: March 31, 2026, 10:30 AM  │
│ Updated: March 31, 2026, 2:45 PM   │
│ Assigned: tech01                    │
│ User: admin                         │
│ Email: admin@email.com             │
│                                    │
│ Description:                       │
│ "The health score is stuck at..."  │
│                                    │
│ Resolution:                        │
│ [If completed/resolved]            │
└────────────────────────────────────┘
```

---

## 💬 Adding Comments

### Comment Thread
Below ticket details, you'll see the comment section with all previous comments.

### Add Your Comment
1. Find the text area: "Add a comment..."
2. Type your update or question
3. Click "Add Comment" button

**Good Comments Include**:
- Status updates
- Questions for clarification
- Information requested
- Test results
- Temporary workarounds

**Example Comments**:
- "We've narrowed it down to cache synchronization issue"
- "Confirmed the issue occurs on all CNC machines"
- "Temporary workaround: restart the application"

### View Comments
All comments shown with:
- Author name
- Timestamp
- Comment text
- Color-coded for readability

---

## ✅ Ticket Status Colors & Meanings

```
🟢 GREEN - RESOLVED
   ├─ Issue is fixed
   └─ Awaiting your confirmation

🔵 BLUE - CLOSED
   ├─ Ticket is complete
   └─ No further action needed

🟡 YELLOW - IN PROGRESS
   ├─ Work is being done
   └─ Regular updates expected

🟤 BROWN - OPEN
   ├─ Ticket submitted
   └─ Awaiting assignment/review

⚫ BLACK - WON'T FIX
   ├─ Not being addressed
   └─ Reason usually documented
```

---

## 🚨 Priority Color Guide

```
🔴 CRITICAL (Red)
   → System is down, data loss risk
   → Response: < 1 hour

🟠 HIGH (Orange)
   → Major feature broken
   → Response: < 4 hours

🟡 MEDIUM (Yellow)
   → Moderate impact, workaround exists
   → Response: < 1 day

🟢 LOW (Green)
   → Minor cosmetic issues
   → Response: < 1 week
```

---

## 🎯 Closing a Ticket

### Option 1: Support Team Closes
Support team marks ticket as "Closed" with resolution.

### Option 2: Manual Close
If you report resolution:

1. View the ticket
2. Scroll to resolution section
3. Enter your resolution details
4. Click "Close Ticket"

**Resolution Details Should Include**:
- What was the cause?
- How was it fixed?
- What preventive measures taken?
- Any follow-up actions?

**Example**:
```
Issue resolved by:
1. Clearing application cache
2. Restarting equipment service
3. Recalibrating health score metrics
4. Verified correct 92% score now shows
```

---

## 📊 Statistics & Insights

### Dashboard Metrics
The statistics cards show:

**Total Tickets**
- Overall volume
- System usage
- Historical data

**Open**
- Tickets needing response
- Your action items
- Quick reference

**In Progress**
- Actively being resolved
- Expected timeline
- Current workload

**Resolved**
- Fixed issues
- Resolution documentation
- Learning resource

**High Priority**
- Urgent tracking
- SLA monitoring
- Critical count

---

## 🎓 Best Practices

### When Creating Ticket
✅ **Do:**
- Write clear, specific titles
- Include all relevant details
- Provide reproduction steps for bugs
- Set appropriate priority
- Use correct category

❌ **Don't:**
- Create duplicate tickets
- Use vague titles ("Help!", "Issue")
- Report already fixed issues
- Set everything as critical
- Leave description blank

### When Adding Comments
✅ **Do:**
- Provide regular updates
- Share workarounds
- Provide log snippets
- Ask clarifying questions
- Confirm resolution

❌ **Don't:**
- Send duplicate comments
- Be unclear or vague
- Share sensitive data
- Necro-bump old tickets
- Create spam comments

### When Reporting Issues
✅ **Include:**
- Exact timestamp of issue
- Equipment/component affected
- Steps to reproduce
- Expected vs actual behavior
- Impact on operations

❌ **Avoid:**
- Reporting without context
- Multiple unrelated issues in one ticket
- Screenshots without explanation
- Emotional language
- Demands instead of requests

---

## 🔒 Privacy & Security

### Your Information
- Tickets are private to your account
- Comments are visible to support staff
- Email addresses used for notifications only
- Data encrypted in transit

### Sensitive Information
⚠️ **Don't Include**:
- Passwords or credentials
- API keys or tokens
- Personal identification numbers
- Financial information
- Protected health information

---

## ⏱️ Response Times

### Priority-Based SLA (Service Level Agreement)

| Priority | Target Response | Target Resolution |
|----------|-----------------|-------------------|
| Critical | 1 hour | 4 hours |
| High | 4 hours | 1 day |
| Medium | 1 day | 3 days |
| Low | 3 days | 1 week |

**Note**: These are targets in normal business hours. Actual times may vary.

---

## 🆘 Troubleshooting

### Can't Find "Support" Button?
1. Make sure you're logged in
2. Check navigation bar at top
3. Refresh the page
4. Try direct URL: `/Support`

### Ticket Not Appearing in List?
1. Check applied filters
2. Clear search box
3. Refresh page
4. Check you created it (not someone else)

### Can't Add Comment?
1. Verify you're logged in
2. Click in text area first
3. Type your comment
4. Check text area isn't too long
5. Refresh and try again

### Priority/Status Unchanged?
1. May be updated by support team
2. Refresh to see latest
3. Check for email notifications
4. Add comment asking for status

---

## 📞 Quick Contact

### Need Urgent Help?
1. Create "Critical" priority ticket
2. Add "URGENT" to title
3. Add message to notify support team

### General Questions?
1. Create "Inquiry" category ticket
2. Provide context and details
3. Wait for response

### Feature Request?
1. Create "Feature" category ticket
2. Explain use case
3. Describe desired functionality
4. Support team will review

---

## 🎯 Common Scenarios

### Scenario 1: Report Equipment Error
```
Title: "Pressure Gauge Calibration Error"
Category: bug
Priority: high
Description: 
  "The pressure gauge on Compressor-2 shows 150 PSI 
   but manual check shows 130 PSI. Started after 
   March 30 update. Affecting maintenance readings."
```

### Scenario 2: Request New Feature
```
Title: "Export Maintenance Reports to PDF"
Category: feature
Priority: medium
Description:
  "Users need ability to export maintenance reports 
   to PDF format for documentation and archival 
   purposes. Would improve reporting workflow."
```

### Scenario 3: Performance Problem
```
Title: "Dashboard Slow When Viewing > 1000 Devices"
Category: performance
Priority: high
Description:
  "Dashboard loads very slowly (10+ seconds) when 
   viewing facility with 1500+ devices. Causes 
   timeout errors and affects operations."
```

---

## 📱 Mobile Compatibility

Support module is fully responsive:
- Works on desktop
- Works on tablet (landscape recommended)
- Works on mobile (portrait friendly)

**Mobile Tips**:
- Use filters to reduce list size
- Tap cards to expand details
- Landscape view for better form display
- Comments easier on larger screens

---

## 🔄 Browser Support

✅ **Supported**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

⚠️ **Limited Support**
- Internet Explorer (not supported)
- Very old browser versions

---

## 📬 Notification Status

### Email Notifications
- Sent when ticket created
- Sent when ticket updated
- Sent when ticket assigned
- Sent when ticket resolved
- Sent when comment added

**Note**: Configure email preferences in account settings

---

## 🎓 Learning Resources

### Documentation
- [Support API Documentation](../SUPPORT_API_DOCS.md)
- [Equipment Monitoring Guide](../GUIDE.md)
- [API Training Guide](../API_TRAINING.md)

### FAQ Section Coming Soon
- Common questions
- Known issues
- Workarounds
- Tips & tricks

---

**Support Module v1.0 - March 31, 2026**
**Status: ✅ Ready to Use**
**Last Updated: March 31, 2026**
