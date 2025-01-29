---
sidebar_position: 4
title: Example Feature Request - Location Ping
description: Example feature request for a location ping button
---

# Feature Request Template

## Overview

**Title:** Location Ping Button (Frontend)

**Feature Name:**  
Manual Location Ping

**Summary:**  
Add a dedicated "Ping" button on the map interface that allows users to manually trigger an immediate location update to all active sharing sessions. The button will be positioned below the orient north button and provide visual feedback when activated.

## Motivation
**Problem Statement:**  
When users are stationary, Grid's location updates are less frequent to conserve battery. However, users sometimes need to ensure their contacts have their exact current location without waiting for the next automatic update.

**User Benefit:**  
- Immediate location sharing when needed
- More control over location update timing
- Better coordination in time-sensitive situations
- Clear feedback that location has been sent
- Battery optimization maintained while enabling manual updates when needed

## Privacy & Security
**Privacy Impact:**  
- Only sends location to existing active sharing sessions
- No new privacy implications as it uses existing sharing permissions
- Location data follows existing E2EE pathways
- No additional data storage required

**Security Considerations:**  
- Must respect existing sharing window permissions
- Should implement rate limiting to prevent spam
- Need to ensure the ping doesn't bypass any existing security checks
- Should maintain existing E2EE for location data

## Technical Details
**Implementation Approach:**  
The ping button will trigger an immediate location update using existing location services but with a manual trigger flag. The system will use existing sharing pathways but prioritize the update.

**Required Changes:**  
- Frontend modifications:
  - Add ping button UI component below orient north button
  - Implement click handler and loading state
  - Add animation for successful ping
  - Add error handling for failed pings
  
- Backend modifications:
  - None required
  
- Database changes:
  - None required, uses existing structures
  
- API changes:
  - N/a

**Dependencies:**  
- No new dependencies required
- Uses existing location services and sharing infrastructure

## User Experience
**Interface Changes:**  
- New circular button below orient north button
- Button icon: location broadcast symbol
- Simple animation on press
- Success/failure feedback
- Optional toast notification on success

**Workflow:**  
1. User taps ping button
2. Button shows loading state
3. Location is sent to all active sharing sessions
4. Visual confirmation of success/failure
5. Optional toast: "Location shared with X contacts"

**Mockups:**  
 [Basic mockup or image of app with a drawn button]

## Compatibility
**Self-Hosting Impact:**  
- Minimal impact on self-hosted instances
- No new infrastructure required


**Migration Requirements:**  
- No database migrations needed
- Backwards compatible with older clients

## Testing
**Test Scenarios:**  
- Button appears correctly on map
- Triggers location update successfully
- Works with multiple active sharing sessions
- Handles offline state gracefully
- Respects rate limiting
- Works with existing E2EE
- Battery impact testing

**Validation Approach:**  
- Manual testing of UI/UX

## Documentation
**User Documentation:**  
- Add section about manual location updates
- Update feature list

**Technical Documentation:**  
- Rate limiting specifications
- Battery optimization notes

## Alternative Approaches
**Alternatives Considered:**  
1. Automatic location updates at shorter intervals
   - Rejected due to battery impact
2. Adding ping option to share menu
   - Rejected as less discoverable
3. Location refresh button in share windows
   - Rejected as less convenient than map button

## Additional Information
**Related Issues:**  
- User feedback about stationary update frequency
- Battery optimization discussions

**References:**  
- Current location update algorithm documentation
- Battery optimization specs
- Existing sharing window documentation

---

**Note:** Before implementing this feature, please:
1. Start a discussion in our Matrix chat
2. Wait for explicit approval from the Grid team
3. Review our contribution guidelines