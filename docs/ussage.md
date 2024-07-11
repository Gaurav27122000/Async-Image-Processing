```markdown
# Usage

## API Endpoints

### Upload CSV

- **URL**: `/api/upload`
- **Method**: `POST`
- **Description**: Upload a CSV file for processing.
- **Parameters**: `file` (form-data)

### Track Status

- **URL**: `/api/status/:requestId`
- **Method**: `GET`
- **Description**: Track the status of a CSV processing request.

## Example

1. Upload a CSV file:
   ```sh
   curl --location 'https://async-image-processing.onrender.com/api/upload-csv' \--form 'csvFile=@"{YOUR_FILE_LOCATION}"'
2. Check the status of a request:
    ```sh
    curl --location 'https://async-image-processing.onrender.com/api/status/7ec117e3-0b01-4335-ac84-9986c4333acd'
