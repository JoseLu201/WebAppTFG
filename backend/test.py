import random

import random

class RandomClass:
    """
    This class represents a random number generator.

    Attributes:
        random_number (int): A random number between 1 and 10.
        random_list (list): A list of 5 random numbers between 1 and 100.
    """

    def __init__(self):
        """
        Initializes a new instance of the RandomClass.

        This constructor initializes the `random_number` attribute with a random number between 1 and 10,
        and the `random_list` attribute with a list of 5 random numbers between 1 and 100.
        """
        self.random_number = random.randint(1, 10)
        self.random_list = random.sample(range(1, 100), 5)
    
    def get_random_number(self):
        """
        Returns the random number.

        Returns:
            int: The random number.
        """
        return self.random_number
    
    def get_random_list(self):
        """
        Returns the list of random numbers.

        Returns:
            list: The list of random numbers.
        """
        return self.random_list