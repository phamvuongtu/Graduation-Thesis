import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = scanner.nextInt();

        System.out.println("List of numbers from 1 to " + num + ":");
        for (int i = 1; i <= num; i++) {
            System.out.print(i + " ");
        }
        System.out.println();

        scanner.close();
    }
}
