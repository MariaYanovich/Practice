import java.sql.*;

public class Main {
    public static void main(String[] args) throws SQLException, ClassNotFoundException {
        String url = "jdbc:mysql://localhost:3306/photoportal?autoReconnect=true&useSSL=false";
        String username = "masha";
        String password = "knopka22";
        Class.forName("com.mysql.jdbc.Driver");
        try (Connection connection = DriverManager.getConnection(url, username, password);
             Statement statement = connection.createStatement()) {
            ResultSet resultSet1 = statement.executeQuery("select * from photoportal.user");
            while (resultSet1.next()) {
                System.out.println(resultSet1.getInt(1)+" "+resultSet1.getString(2));

            }
            System.out.println("________________");
            ResultSet resultSet2 = statement.executeQuery("select * from photoportal.photo_post");

            while (resultSet2.next()) {
                System.out.println(resultSet2.getInt(1)+" "+resultSet2.getString(2)+" "+
                        resultSet2.getString(3)
                        +" "+resultSet2.getString(4)+" "+resultSet2.getInt(5));
            }
            System.out.println("________________");

            ResultSet resultSet3 = statement.executeQuery("select name, count(user_id)\n" +
                    "from photoportal.user\n" +
                    "\n" +
                    "natural join photoportal.photo_post\n" +
                    "\n" +
                    "where creation_date like '____-05-09 __:__:__'\n" +
                    "\n" +
                    "group by user_id");
            while (resultSet3.next()) {
                System.out.println(resultSet3.getString(1)+" "+resultSet3.getInt(2));

            }
            System.out.println("________________");

            ResultSet resultSet4 = statement.executeQuery("select * from photoportal.photo_post where user_id = '9'" +
                    " and description like '%hello%';\n");
            while (resultSet4.next()) {
                System.out.println(resultSet4.getInt(1)+" "+resultSet4.getString(2)+" "+
                        resultSet4.getString(3)
                        +" "+resultSet4.getString(4)+" "+resultSet4.getInt(5));

            }
            System.out.println("________________");

            ResultSet resultSet5 = statement.executeQuery("SELECT * FROM photoportal.photo_post order by CREATION_DATE;");
            while (resultSet5.next()) {
                System.out.println(resultSet5.getInt(1)+" "+resultSet5.getString(2)+" "+
                        resultSet5.getString(3)
                        +" "+resultSet5.getString(4)+" "+resultSet5.getInt(5));

            }
            System.out.println("________________");
        }

    }
}
