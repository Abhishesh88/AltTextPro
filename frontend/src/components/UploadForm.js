import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    color: #00796b;
    text-align: center;
    margin-bottom: 1.5rem;
`;

const FileInput = styled.input`
    padding: 1rem;
    border: 2px dashed #b2dfdb;
    border-radius: 8px;
    cursor: pointer;
    
    &:hover {
        border-color: #00796b;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    background-color: #00796b;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: #00695c;
    }

    &:disabled {
        background-color: #b2dfdb;
        cursor: not-allowed;
    }
`;

const UploadForm = ({ onUpload }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const file = event.target.image.files[0];
        formData.append('image', file);
        onUpload(formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Title>Image Analysis</Title>
            <FileInput 
                type="file" 
                name="image" 
                accept="image/*" 
                required 
            />
            <Button type="submit">
                Analyze Image
            </Button>
        </Form>
    );
};

export default UploadForm;