const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const db = require("./db/db");

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname.startsWith("/assets/")) {
    const file = path.join(__dirname, pathname);
    const type = pathname.endsWith(".css") ? "text/css" : "text/plain";
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("<h1>404</h1>");
      }
      res.writeHead(200, { "Content-Type": type });
      res.end(data);
    });
    return;
  }

  // show all courses
  if (pathname === "/" || pathname === "/courses") {
    db.query("SELECT * FROM courses", (err, rows) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        return res.end("DB error");
      }

      const table = rows.map(r =>
        `<tr>
          <td>${r.course_code}</td>
          <td>${r.title}</td>
          <td>${r.instructor}</td>
          <td>${r.time}</td>
          <td>${r.location}</td>
          <td><a href="/add?course_id=${r.course_id}">Add</a></td>
        </tr>`
      ).join("");

      fs.readFile("templates/timetable.html", "utf8", (e, html) => {
        if (e) {
          res.writeHead(500);
          return res.end("Template error");
        }
        html = html.replace("</tbody>", table + "</tbody>");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      });
    });
    return;
  }

  // add a course
  if (pathname === "/add" && query.course_id) {
    db.query(
      "INSERT INTO user_schedule (user_id, course_id) VALUES (1, ?) ON DUPLICATE KEY UPDATE course_id=course_id",
      [query.course_id],
      (err) => {
        if (err) {
          res.writeHead(500);
          return res.end("DB error");
        }
        res.writeHead(302, { Location: "/myschedule" });
        res.end();
      }
    );
    return;
  }

  // show my schedule
  if (pathname === "/myschedule") {
    const sql = `
      SELECT c.course_code, c.title, c.instructor, c.time, c.location, c.course_id
      FROM user_schedule us
      JOIN courses c ON c.course_id = us.course_id
      WHERE us.user_id = 1
    `;
    db.query(sql, (err, rows) => {
      if (err) {
        res.writeHead(500);
        return res.end("DB error");
      }

      const table = rows.map(r =>
        `<tr>
          <td>${r.course_code}</td>
          <td>${r.title}</td>
          <td>${r.instructor}</td>
          <td>${r.time}</td>
          <td>${r.location}</td>
          <td><a href="/remove?course_id=${r.course_id}">Remove</a></td>
        </tr>`
      ).join("");

      fs.readFile("templates/my-schedule.html", "utf8", (e, html) => {
        if (e) {
          res.writeHead(500);
          return res.end("Template error");
        }
        html = html.replace("</tbody>", table + "</tbody>");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      });
    });
    return;
  }

  // remove a course
  if (pathname === "/remove" && query.course_id) {
    db.query("DELETE FROM user_schedule WHERE user_id=1 AND course_id=?", [query.course_id], (err) => {
      if (err) {
        res.writeHead(500);
        return res.end("DB error");
      }
      res.writeHead(302, { Location: "/myschedule" });
      res.end();
    });
    return;
  }

  // 404
  fs.readFile("templates/error-404.html", (err, data) => {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(err ? "<h1>404</h1>" : data);
  });
});

server.listen(8000, () => console.log("Server running on http://localhost:8000"));
