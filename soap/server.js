const http = require('http');
const fs = require('fs');
const soap = require('soap');

let nextId = 101;

const service = {
  StudentService: {
    StudentPort: {
      addStudent(args) {
        console.log('Received:', args);
        return { status: 'SUCCESS', id: nextId++ };
      }
    }
  }
};

const xml = fs.readFileSync('student.wsdl', 'utf8');
const server = http.createServer((req, res) => res.end('SOAP server running'));

server.listen(8000, () => {
  soap.listen(server, '/ws/students', service, xml);
  console.log('SOAP service: http://localhost:8000/ws/students?wsdl');
});