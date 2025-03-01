import { RepositoryService } from '../src/repository/repository.service';

const repo = new RepositoryService();

export async function seed() {
    // Restarts DB
    await repo.request.deleteMany()
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