import React, { useState } from 'react';
import {
  Paperclip,
  X,
  File,
  FileText,
  FileImage,
  FileArchive,
  Download
} from 'lucide-react';
import { toast } from 'sonner';
import Button from '../ui/Button';

const TicketAttachments = ({ ticketId, attachments = [] }) => {
  const [files, setFiles] = useState(attachments);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        id: `attachment-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: file.name,
        size: formatFileSize(file.size),
        type: getFileType(file.type),
        uploadedBy: 'Current User',
        uploadedAt: new Date(),
        url: URL.createObjectURL(file)
      }));

      setFiles((prev) => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} file(s) uploaded successfully`);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: `attachment-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: file.name,
        size: formatFileSize(file.size),
        type: getFileType(file.type),
        uploadedBy: 'Current User',
        uploadedAt: new Date(),
        url: URL.createObjectURL(file)
      }));

      setFiles((prev) => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} file(s) uploaded successfully`);
    }
  };

  const removeFile = (id) => {
    setFiles(files.filter((file) => file.id !== id));
    toast.success('File removed');
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return <FileImage className="h-5 w-5 text-blue-500" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'archive':
        return <FileArchive className="h-5 w-5 text-yellow-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getFileType = (mimeType) => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf') return 'pdf';
    if (['application/zip', 'application/x-rar-compressed'].includes(mimeType)) return 'archive';
    return 'document';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Paperclip className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground mb-2">
          Drag and drop files here, or click to browse
        </p>
        <input
          type="file"
          id="file-upload"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
          <Paperclip className="h-4 w-4 mr-2" />
          Browse Files
        </Button>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Attachments ({files.length})</h4>
          <ul className="space-y-2">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between p-3 border rounded-md bg-muted/30"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="text-sm font-medium line-clamp-1">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.size} • Uploaded {file.uploadedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a href={file.url} download={file.name} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TicketAttachments;
