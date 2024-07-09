#include <iostream>

using namespace std;

int main() {
    int num;
    cout << "Enter a number: ";
    cin >> num;

    cout << "List of numbers from 1 to " << num << ":\n";
    for (int i = 1; i <= num; i++) {
        cout << i << " ";
    }
    cout << endl;

    return 0;
}