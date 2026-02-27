/* PAC Desarrollo
   Nerea Domínguez Ochoa
*/
import java.util.Random;
import java.util.Scanner;

public class PiedraPapelTijera {

    public static void Main(String[] args) {

        Random rand = new Random();
        String nombre, jugador, maquina;
        int opcionMaquina;
        boolean jugar = true;

        Scanner scanner = new Scanner(System.in);

        System.out.print("Introduce tu nombre y apellidos: ");
        nombre = scanner.nextLine();

        System.out.println("¡Bienvenid@ al juego de Piedra, Papel o Tijera, " + nombre + "!");
        System.out.println("Escribe Salir en cualquier momento para terminar.");

        while (jugar) {
            System.out.println("Elige piedra, papel o tijera: ");
            jugador = scanner.nextLine().toLowerCase();

            if (jugador.equals("salir")) {
                jugar = false;
                System.out.println("¡Gracias por jugar!");
                break;
            }

            opcionMaquina = rand.nextInt(3);
            if (opcionMaquina == 0) {
                maquina = "piedra";
            } else if (opcionMaquina == 1) {
                maquina = "papel";
            } else {
                maquina = "tijera";
            }

            if (!jugador.equals("piedra") && !jugador.equals("papel") && !jugador.equals("tijera")) {
                System.out.println("Entrada inválida. Intenta de nuevo.");
                continue;
            }

            System.out.println("La máquina eligió: " + maquina);

            if (jugador.equals(maquina)) {
                System.out.println("¡Es un empate!");
            } else if (
                (jugador.equals("piedra") && maquina.equals("tijera")) ||
                (jugador.equals("papel") && maquina.equals("piedra")) ||
                (jugador.equals("tijera") && maquina.equals("papel"))
            ) {
                System.out.println("¡Ganaste!");
            } else {
                System.out.println("¡Perdiste!");
            }
        }

        scanner.close();
    }
}
