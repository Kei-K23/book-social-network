package com.dev.kei.book.network.api;

import com.dev.kei.book.network.api.book.Book;
import com.dev.kei.book.network.api.book.BookRepository;
import com.dev.kei.book.network.api.role.Role;
import com.dev.kei.book.network.api.role.RoleRepository;
import com.dev.kei.book.network.api.user.User;
import com.dev.kei.book.network.api.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
public class BookNetworkApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookNetworkApiApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository, BookRepository bookRepository, UserRepository userRepository) {
		return args -> {
			if (roleRepository.findByName("USER").isEmpty()) {
				roleRepository.save(Role.builder().name("USER").build());
			}

			if (bookRepository.findAll().isEmpty()) {
				Optional<Role> userRole = roleRepository.findByName("USER");
				Optional<User> userOptional = userRepository.findByEmail("admin@gmail.com");
				User user;
                user = userOptional.orElseGet(() -> userRepository.save(new User().builder()
                        .firstName("Admin")
                        .lastName("Michael")
                        .email("admin@gmail.com")
                        .password("123")
                        .roles(List.of(userRole.get()))
                        .build()));

				List<Book> books = Arrays.asList(
						new Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565", "A novel set in the Roaring Twenties, telling the story of Jay Gatsby's unrequited love for Daisy Buchanan.", true, user),
						new Book("To Kill a Mockingbird", "Harper Lee", "9780061120084", "A novel about the serious issues of rape and racial inequality, told through the eyes of young Scout Finch.", true, user),
						new Book("1984", "George Orwell", "9780451524935", "A dystopian novel set in a totalitarian society under constant surveillance, led by Big Brother.", true, user),
						new Book("Pride and Prejudice", "Jane Austen", "9780141439518", "A classic novel about the manners and matrimonial machinations among the British gentry of the early 19th century.", true, user),
						new Book("The Catcher in the Rye", "J.D. Salinger", "9780316769488", "The story of Holden Caulfield, a teenager who leaves his prep school in Pennsylvania and goes underground in New York City for three days.", true, user),
						new Book("The Hobbit", "J.R.R. Tolkien", "9780547928227", "A fantasy novel and children's book by J.R.R. Tolkien. It follows the quest of home-loving Bilbo Baggins to win a share of the treasure guarded by Smaug the dragon.", true, user),
						new Book("Fahrenheit 451", "Ray Bradbury", "9781451673319", "A dystopian novel about a future American society where books are outlawed and 'firemen' burn any that are found.", true, user),
						new Book("Jane Eyre", "Charlotte Brontë", "9780142437207", "A novel about the experiences of the orphaned title character, including her growth to adulthood and her love for Mr. Rochester.", true, user),
						new Book("Brave New World", "Aldous Huxley", "9780060850524", "A dystopian novel set in a futuristic World State, where citizens are environmentally engineered into an intelligence-based social hierarchy.", true, user),
						new Book("Wuthering Heights", "Emily Brontë", "9780141439556", "A tale of passionate and doomed love between Catherine Earnshaw and Heathcliff, set on the Yorkshire moors.", true, user),
						new Book("The Odyssey", "Homer", "9780140268867", "An epic poem attributed to Homer, following the adventures of Odysseus as he tries to return home after the Trojan War.", true, user),
						new Book("Moby-Dick", "Herman Melville", "9780142437247", "A novel about the voyage of the whaling ship Pequod, commanded by Captain Ahab who leads his crew on a quest to find and kill the giant white sperm whale Moby Dick.", true, user),
						new Book("War and Peace", "Leo Tolstoy", "9780199232765", "A historical novel that tells the story of five families during the Napoleonic Wars.", true, user),
						new Book("Crime and Punishment", "Fyodor Dostoevsky", "9780143058144", "A psychological drama of a young student Raskolnikov who murders an old pawnbroker woman and her sister, and then struggles with his conscience and the law.", true, user),
						new Book("The Brothers Karamazov", "Fyodor Dostoevsky", "9780374528379", "A story about the spiritual drama of moral struggles concerning faith, doubt, and reason, set against a modernizing Russia.", true, user),
						new Book("Anna Karenina", "Leo Tolstoy", "9780143035008", "A novel of complex human relationships set in the Russian society of the 19th century, focusing on the tragic love affair between Anna Karenina and Count Vronsky.", true, user),
						new Book("Madame Bovary", "Gustave Flaubert", "9780140449129", "A novel about the life of Emma Bovary, a doctor's wife, who has adulterous affairs and lives beyond her means in order to escape the banalities and emptiness of provincial life.", true, user),
						new Book("The Divine Comedy", "Dante Alighieri", "9780142437223", "An epic poem describing Dante's journey through Hell, Purgatory, and Paradise.", true, user),
						new Book("Catch-22", "Joseph Heller", "9781451626650", "A satirical novel set during World War II, dealing with the absurdities of war and bureaucracy.", true, user),
						new Book("The Grapes of Wrath", "John Steinbeck", "9780143039433", "A novel about the Joad family, tenant farmers displaced from Oklahoma by the Great Depression, who set out for California along with thousands of others in search of a better life.", true, user)
				);

				bookRepository.saveAll(books);
			}
		};
	}
}
