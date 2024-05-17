import { RepositoryService } from '../src/repository/repository.service';

const repo = new RepositoryService();

async function seed() {
    // Restarts DB
    await repo.user.deleteMany()
    await repo.equipment.deleteMany()
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await repo.$disconnect();
  });