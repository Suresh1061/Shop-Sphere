# Project Overview
This is a full-stack web application that I created using Next.js 14. In this application, there are two main types of users: Team Member and Admin. Both users share the same dashboard but have different permissions.

Admins can easily update any products without needing approval. However, when a Team Member updates a product, it requires approval from an Admin before the changes are reflected on the dashboard.

## Authentication
- The platform allows users to register as either a Team Member or an Admin.
- During login, users do not need to specify their role (e.g., Admin or Team Member). Their role is automatically determined based on the information provided during the registration process.

# Features
## Team members section:
- Team members can view a list of all products on their dashboard.
- Upon selecting a product, they can edit its title, image, and other details on a product detail page.
- The product image can be uploaded to Firebase Cloud Storage, with options for cropping and editing before uploading.
- After making changes, team members can submit these for review, where the changes are saved as unapproved data in a MongoDB collection.
- A separate page allows team members to track the status of their submissions, with states such as "pending," "rejected," or "approved."

## Admin Section:
- Admins can also see the same list of all products on their dashboard.
- Admins can access a product detail page to modify all parameters of the products.
- Admins can directly update products by clicking the "save" button, which sends an API request to update the product without requiring further approval.
- Admins can review change requests submitted by team members on a dedicated pending reviews page.
- If a change request is approved by an admin, the product is updated, and the status in the reviews collection is set to "approved."
- If a change request is rejected, the status is updated to "rejected."
- Admins can also see the total number of pending requests, approved requests, and rejected requests on their profile page.


## Profile section
- Both Admins and Team Members have a Profile section.
- Stats displayed on this page include:
  - Number of Requests
  - Number of Approved Requests
  - Number of Rejected Requests

# Deployment Link: 
  ```bash
    https://assessment-task-theta.vercel.app/
  ```

# Routing
1. Register (/register)
2. Login (/login)
3. Dashboard (/dashboard)
   - Accessible by both Admin and Team Members.
   - Session token is used to differentiate between the Admin and Team Member dashboards.
4. Product (/product/product_id)
   - Accessible by both Admin and Team Members.
   - Here admin can directly update the product. Members can update the product but in under review status.
5. Profile (/profile)
6. My Submissions (/profile/my-submissions)
   - Accessible only to Team Members with their submissions.
7. Pending Requests (/pending-requests)
   - Accessible only to users with the Admin role.
8. Request Details (/pending-requests/request_id)
   - Accessible only to Admins. Admins can view and make changes to the request as needed.

# Tech tools
- Next Js 14
- Tailwind CSS
- Shadcn UI
- Firebase
- Axios
- Bcryptjs
- Jose
- MongoDB
- React Form Hook & Zod
- Redux Toolkit
- React Hot Toast
- Tanstack React Query
- React Advance Crop
