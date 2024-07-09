#include <stdio.h>

int main() {
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);

    printf("List of numbers from 1 to %d:\n", num);
    for (int i = 1; i <= num; i++) {
        printf("%d ", i);
    }
    printf("\n");

    return 0;
}
