import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import com.google.gson.*;

public class CheckStatus extends javax.servlet.http.HttpServlet {
    class StatusActions {
        private int s;

        public StatusActions(int status) {
            this.s = status;
        }

        public int getStatus() {
            return s;
        }

        public void setStatus(int status) {
            this.s = status;
        }
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Gson gson = new Gson();
        response.getWriter().println(gson.toJson(new StatusActions(response.getStatus())));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
